import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// One shared STOMP connection for the whole app. The same access token used for REST authenticates
// the CONNECT frame (see WsAuthChannelInterceptor on the backend). Components call useStomp() to
// subscribe/publish; subscriptions made before the socket connects are buffered and flushed on
// connect, so callers don't have to care about timing.
const StompContext = createContext(null);

function resolveWsUrl() {
  const configured = import.meta.env.VITE_WS_URL || '/ws';
  if (configured.startsWith('http')) return configured;
  return window.location.origin + configured;
}

export function StompProvider({ children }) {
  const token = useSelector((s) => s.auth.accessToken);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);
  const pendingRef = useRef([]); // {destination, callback, sub} awaiting connect

  useEffect(() => {
    if (!token) return undefined;

    const client = new Client({
      webSocketFactory: () => new SockJS(resolveWsUrl()),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 4000,
      onConnect: () => {
        setConnected(true);
        // Flush buffered subscriptions.
        pendingRef.current.forEach((p) => {
          p.sub = client.subscribe(p.destination, (msg) => p.callback(JSON.parse(msg.body)));
        });
      },
      onWebSocketClose: () => setConnected(false),
      onStompError: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      pendingRef.current = [];
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [token]);

  const api = useMemo(() => ({
    connected,
    subscribe(destination, callback) {
      const client = clientRef.current;
      const entry = { destination, callback, sub: null };
      if (client && client.connected) {
        entry.sub = client.subscribe(destination, (msg) => callback(JSON.parse(msg.body)));
      }
      pendingRef.current.push(entry);
      return () => {
        if (entry.sub) entry.sub.unsubscribe();
        pendingRef.current = pendingRef.current.filter((p) => p !== entry);
      };
    },
    publish(destination, body) {
      const client = clientRef.current;
      if (client && client.connected) {
        client.publish({ destination, body: JSON.stringify(body) });
      }
    },
  }), [connected]);

  return <StompContext.Provider value={api}>{children}</StompContext.Provider>;
}

export function useStomp() {
  const ctx = useContext(StompContext);
  if (!ctx) {
    // Outside the provider (e.g. logged out) — return inert no-ops so callers stay simple.
    return { connected: false, subscribe: () => () => {}, publish: () => {} };
  }
  return ctx;
}
