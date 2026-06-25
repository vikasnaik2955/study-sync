/* @ds-bundle: {"format":3,"namespace":"PlentyDesignSystem_a440a4","components":[{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"CategoryCard","sourcePath":"components/cards/CategoryCard.jsx"},{"name":"ConsumerCard","sourcePath":"components/cards/ConsumerCard.jsx"},{"name":"DonationCard","sourcePath":"components/cards/DonationCard.jsx"},{"name":"NotificationCard","sourcePath":"components/cards/NotificationCard.jsx"},{"name":"RequestCard","sourcePath":"components/cards/RequestCard.jsx"},{"name":"VolunteerCard","sourcePath":"components/cards/VolunteerCard.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Chip","sourcePath":"components/data-display/Chip.jsx"},{"name":"StatCard","sourcePath":"components/data-display/StatCard.jsx"},{"name":"StatusBadge","sourcePath":"components/data-display/StatusBadge.jsx"},{"name":"Timeline","sourcePath":"components/data-display/Timeline.jsx"},{"name":"BottomSheet","sourcePath":"components/feedback/BottomSheet.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"MapPlaceholder","sourcePath":"components/feedback/MapPlaceholder.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"AppBar","sourcePath":"components/navigation/AppBar.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/cards/Card.jsx":"3ae64db5d50b","components/cards/CategoryCard.jsx":"b0e818f74954","components/cards/ConsumerCard.jsx":"82d99ed6a03d","components/cards/DonationCard.jsx":"b865486936ee","components/cards/NotificationCard.jsx":"fe57bd6164c4","components/cards/RequestCard.jsx":"224b1eb9f1a8","components/cards/VolunteerCard.jsx":"d6f182267722","components/data-display/Avatar.jsx":"900872c12b1c","components/data-display/Chip.jsx":"bfee1e67e2db","components/data-display/StatCard.jsx":"76d6dabc9508","components/data-display/StatusBadge.jsx":"8f600370d239","components/data-display/Timeline.jsx":"236ef79c34b3","components/feedback/BottomSheet.jsx":"82884df8a452","components/feedback/EmptyState.jsx":"bb9d2e382404","components/feedback/MapPlaceholder.jsx":"63de588fa083","components/feedback/Toast.jsx":"1ba466bcbc5b","components/forms/Button.jsx":"312aa22142b0","components/forms/IconButton.jsx":"14790c7b058c","components/forms/Input.jsx":"82cac38f7930","components/forms/Select.jsx":"7580237985e9","components/forms/Switch.jsx":"09b46f20cf55","components/forms/Textarea.jsx":"89ade46a9ed7","components/icon/Icon.jsx":"6545e09032e1","components/navigation/AppBar.jsx":"86afe0c3d552","components/navigation/BottomNav.jsx":"12477a26c2bf","components/navigation/Tabs.jsx":"e17f5f0db9f6","ui_kits/plenty-app/AdminScreens.jsx":"663ba5d99b5f","ui_kits/plenty-app/ConsumerScreens.jsx":"bbb6d4142614","ui_kits/plenty-app/DonorScreens.jsx":"496300477640","ui_kits/plenty-app/DonorScreens2.jsx":"e1e2f0f970c8","ui_kits/plenty-app/SharedScreens.jsx":"46bef53dec53","ui_kits/plenty-app/VolunteerScreens.jsx":"65723ef74b74","ui_kits/plenty-app/app.jsx":"3ebd092f5ab7","ui_kits/plenty-app/data.js":"1a61513e7c2a","ui_kits/plenty-app/kit.jsx":"05b3240f4f4d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PlentyDesignSystem_a440a4 = window.PlentyDesignSystem_a440a4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Base surface container — the rounded white card used throughout. */
function Card({
  children,
  padding = 16,
  interactive = false,
  accentBar = null,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const accentColors = {
    food: 'var(--food)',
    clothes: 'var(--clothes)',
    brand: 'var(--brand)',
    reward: 'var(--reward)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: interactive && hover ? 'translateY(-1px)' : 'none',
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      cursor: interactive || onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), accentBar && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: accentColors[accentBar] || accentBar
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
const SIZES = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 56,
  xl: 72
};
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/** Avatar with initials fallback, optional image and status ring. */
function Avatar({
  name = '',
  src,
  size = 'md',
  accent = 'brand',
  ring = false,
  style = {}
}) {
  const dim = SIZES[size] || SIZES.md;
  const accents = {
    brand: ['var(--green-100)', 'var(--green-700)'],
    food: ['var(--orange-100)', 'var(--orange-700)'],
    clothes: ['var(--teal-100)', 'var(--teal-700)'],
    neutral: ['var(--neutral-200)', 'var(--neutral-700)']
  };
  const [bg, fg] = accents[accent] || accents.brand;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      flex: 'none',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: bg,
      color: fg,
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: dim * 0.36,
      boxShadow: ring ? '0 0 0 3px var(--surface-card), 0 0 0 5px var(--brand)' : 'none',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Compact filter/selection chip. Toggleable with `selected`. */
function Chip({
  children,
  selected = false,
  leftIcon = null,
  onClick,
  accent = 'brand',
  style = {},
  ...rest
}) {
  const accents = {
    brand: {
      fg: 'var(--brand-strong)',
      bg: 'var(--brand-soft)',
      border: 'var(--green-300)'
    },
    food: {
      fg: 'var(--orange-600)',
      bg: 'var(--food-soft)',
      border: 'var(--orange-300)'
    },
    clothes: {
      fg: 'var(--teal-600)',
      bg: 'var(--clothes-soft)',
      border: 'var(--teal-300)'
    },
    neutral: {
      fg: 'var(--text-primary)',
      bg: 'var(--surface-sunken)',
      border: 'var(--border-strong)'
    }
  };
  const a = accents[accent] || accents.brand;
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 36,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      background: selected ? a.bg : 'var(--surface-card)',
      color: selected ? a.fg : 'var(--text-secondary)',
      border: `1.5px solid ${selected ? a.border : 'var(--border-subtle)'}`,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all var(--duration-fast) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
      ...style
    }
  }, rest), leftIcon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Chip.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatCard.jsx
try { (() => {
/** Compact metric tile for dashboards, rewards, and reports. */
function StatCard({
  value,
  label,
  icon = null,
  accent = 'brand',
  trend,
  style = {}
}) {
  const accents = {
    brand: ['var(--brand-soft)', 'var(--brand-strong)'],
    food: ['var(--food-soft)', 'var(--orange-600)'],
    clothes: ['var(--clothes-soft)', 'var(--teal-600)'],
    reward: ['var(--reward-soft)', 'var(--gold-600)'],
    neutral: ['var(--surface-sunken)', 'var(--text-primary)']
  };
  const [bg, fg] = accents[accent] || accents.brand;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-md)',
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-h2)',
      fontWeight: 800,
      color: 'var(--text-primary)',
      letterSpacing: '-0.02em',
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, label), trend && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 700,
      color: 'var(--success)'
    }
  }, trend)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatusBadge.jsx
try { (() => {
const STATUS = {
  requested: {
    label: 'Requested',
    fg: 'var(--status-requested)',
    bg: 'var(--status-requested-soft)'
  },
  accepted: {
    label: 'Accepted',
    fg: 'var(--status-accepted)',
    bg: 'var(--status-accepted-soft)'
  },
  picked_up: {
    label: 'Picked up',
    fg: 'var(--status-picked-up)',
    bg: 'var(--status-picked-up-soft)'
  },
  delivered: {
    label: 'Delivered',
    fg: 'var(--status-delivered)',
    bg: 'var(--status-delivered-soft)'
  },
  completed: {
    label: 'Completed',
    fg: 'var(--status-completed)',
    bg: 'var(--status-completed-soft)'
  },
  cancelled: {
    label: 'Cancelled',
    fg: 'var(--status-cancelled)',
    bg: 'var(--status-cancelled-soft)'
  }
};
const TONES = {
  success: {
    fg: 'var(--green-700)',
    bg: 'var(--success-soft)'
  },
  warning: {
    fg: 'var(--gold-600)',
    bg: 'var(--warning-soft)'
  },
  error: {
    fg: 'var(--red-500)',
    bg: 'var(--error-soft)'
  },
  info: {
    fg: 'var(--blue-500)',
    bg: 'var(--info-soft)'
  },
  food: {
    fg: 'var(--orange-600)',
    bg: 'var(--food-soft)'
  },
  clothes: {
    fg: 'var(--teal-600)',
    bg: 'var(--clothes-soft)'
  },
  neutral: {
    fg: 'var(--text-secondary)',
    bg: 'var(--surface-sunken)'
  }
};

/**
 * Color-coded pill. Pass `status` for a lifecycle stage, or `tone` for a generic badge.
 */
function StatusBadge({
  status,
  tone,
  children,
  dot = true,
  size = 'md',
  style = {}
}) {
  const conf = status ? STATUS[status] : TONES[tone] || TONES.neutral;
  const label = children || (status ? STATUS[status]?.label : null);
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: dot ? 6 : 0,
      padding: sm ? '3px 9px' : '5px 11px',
      borderRadius: 'var(--radius-full)',
      background: conf.bg,
      color: conf.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: sm ? 11 : 'var(--text-caption)',
      fontWeight: 700,
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: conf.fg,
      flex: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Timeline.jsx
try { (() => {
const ORDER = ['requested', 'accepted', 'picked_up', 'delivered', 'completed'];
const LABELS = {
  requested: 'Requested',
  accepted: 'Volunteer accepted',
  picked_up: 'Picked up',
  delivered: 'Delivered',
  completed: 'Completed'
};

/**
 * Vertical lifecycle stepper. `current` marks the active stage; earlier steps render done.
 * Optionally pass `steps` to override labels/times: [{key,label,time}].
 */
function Timeline({
  current = 'requested',
  steps,
  style = {}
}) {
  const list = steps || ORDER.map(key => ({
    key,
    label: LABELS[key]
  }));
  const currentIdx = list.findIndex(s => s.key === current);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, list.map((step, i) => {
    const done = i < currentIdx;
    const active = i === currentIdx;
    const color = done || active ? 'var(--brand)' : 'var(--border-strong)';
    const last = i === list.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: step.key,
      style: {
        display: 'flex',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        flex: 'none',
        background: done ? 'var(--brand)' : active ? 'var(--surface-card)' : 'var(--surface-sunken)',
        border: `2px solid ${color}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: 800,
        boxShadow: active ? '0 0 0 4px var(--focus-ring)' : 'none'
      }
    }, done ? '✓' : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: active ? 'var(--brand)' : 'var(--border-strong)'
      }
    })), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        minHeight: 26,
        background: done ? 'var(--brand)' : 'var(--border-subtle)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: last ? 0 : 18,
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-body)',
        fontWeight: active ? 700 : 600,
        color: done || active ? 'var(--text-primary)' : 'var(--text-muted)'
      }
    }, step.label), step.time && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-caption)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, step.time)));
  }));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Timeline.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    padding: '0 14px',
    fontSize: 'var(--text-sm)',
    radius: 'var(--radius-md)',
    gap: 6,
    icon: 16
  },
  md: {
    height: 46,
    padding: '0 18px',
    fontSize: 'var(--text-body)',
    radius: 'var(--radius-md)',
    gap: 8,
    icon: 18
  },
  lg: {
    height: 54,
    padding: '0 22px',
    fontSize: 'var(--text-lg)',
    radius: 'var(--radius-lg)',
    gap: 9,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--brand)',
    fg: 'var(--brand-on)',
    border: 'transparent',
    hover: 'var(--brand-strong)',
    shadow: 'var(--shadow-brand)'
  },
  secondary: {
    bg: 'var(--surface-card)',
    fg: 'var(--text-primary)',
    border: 'var(--border-strong)',
    hover: 'var(--surface-sunken)',
    shadow: 'none'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--brand-strong)',
    border: 'transparent',
    hover: 'var(--brand-soft)',
    shadow: 'none'
  },
  destructive: {
    bg: 'var(--error)',
    fg: '#fff',
    border: 'transparent',
    hover: '#c2392d',
    shadow: 'none'
  }
};

/**
 * Primary action button. Bottom-anchored for key flows.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const isOff = disabled || loading;
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    minWidth: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : undefined,
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.01em',
    color: v.fg,
    background: isOff ? 'var(--neutral-200)' : hover && !active ? v.hover : v.bg,
    border: `1.5px solid ${isOff ? 'transparent' : v.border}`,
    borderRadius: s.radius,
    boxShadow: !isOff && variant === 'primary' && !active ? v.shadow : 'none',
    cursor: isOff ? 'not-allowed' : 'pointer',
    transform: active && !isOff ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
    opacity: isOff && variant !== 'primary' && variant !== 'destructive' ? 0.55 : isOff ? 0.85 : 1,
    color: isOff ? 'var(--text-disabled)' : v.fg,
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    outline: 'none',
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: isOff,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: css
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, {
    size: s.icon,
    color: css.color
  }), !loading && leftIcon, children, !loading && rightIcon);
}
function Spinner({
  size = 18,
  color = '#fff'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: `2px solid ${color}`,
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'plenty-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes plenty-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 44,
  lg: 52
};

/**
 * Square/round icon-only button. Always pass aria-label.
 */
function IconButton({
  children,
  size = 'md',
  variant = 'ghost',
  round = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;
  const variants = {
    ghost: {
      bg: hover ? 'var(--surface-sunken)' : 'transparent',
      fg: 'var(--text-secondary)',
      border: 'transparent'
    },
    soft: {
      bg: hover ? 'var(--neutral-200)' : 'var(--surface-sunken)',
      fg: 'var(--text-primary)',
      border: 'transparent'
    },
    outline: {
      bg: hover ? 'var(--surface-sunken)' : 'var(--surface-card)',
      fg: 'var(--text-primary)',
      border: 'var(--border-strong)'
    },
    brand: {
      bg: hover ? 'var(--brand-strong)' : 'var(--brand)',
      fg: '#fff',
      border: 'transparent'
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      width: dim,
      height: dim,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: v.bg,
      color: v.fg,
      border: `1.5px solid ${v.border}`,
      borderRadius: round ? 'var(--radius-full)' : 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: active && !disabled ? 'scale(0.92)' : 'scale(1)',
      transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text/number input with label, hint, error, optional leading icon and trailing slot.
 */
function Input({
  label,
  hint,
  error,
  leftIcon = null,
  trailing = null,
  type = 'text',
  disabled = false,
  required = false,
  id,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? 'var(--error)' : focus ? 'var(--brand)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 50,
      padding: '0 14px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? `0 0 0 3px var(--focus-ring)` : 'none',
      transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)'
    }
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      color: 'var(--text-primary)',
      height: '100%',
      ...style
    }
  }, rest)), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, trailing)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Styled native select. Pass options as [{value,label}] or children <option>s.
 */
function Select({
  label,
  hint,
  error,
  options = null,
  placeholder,
  disabled = false,
  required = false,
  id,
  children,
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || React.useId();
  const borderColor = error ? 'var(--error)' : focus ? 'var(--brand)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 50,
      padding: '0 40px 0 14px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? `0 0 0 3px var(--focus-ring)` : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)',
      outline: 'none'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      fontSize: 12
    }
  }, "\u25BE")), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** On/off toggle. Use for availability, preferences, settings. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  style = {},
  ...rest
}) {
  const swId = id || React.useId();
  const track = checked ? 'var(--brand)' : 'var(--neutral-300)';
  const toggle = /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    id: swId,
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: 'relative',
      width: 48,
      height: 28,
      flex: 'none',
      background: disabled ? 'var(--neutral-200)' : track,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--duration-base) var(--ease-standard)',
      opacity: disabled ? 0.6 : 1,
      padding: 0,
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: 3,
      width: 22,
      height: 22,
      background: '#fff',
      borderRadius: '50%',
      boxShadow: 'var(--shadow-sm)',
      transform: checked ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform var(--duration-base) var(--ease-emphasized)'
    }
  }));
  if (!label) return toggle;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, toggle, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text field with label, hint, error, and live character count. */
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  maxLength,
  disabled = false,
  required = false,
  id,
  value,
  defaultValue,
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [count, setCount] = React.useState((value ?? defaultValue ?? '').length);
  const taId = id || React.useId();
  const borderColor = error ? 'var(--error)' : focus ? 'var(--brand)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: taId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    maxLength: maxLength,
    disabled: disabled,
    required: required,
    value: value,
    defaultValue: defaultValue,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onChange: e => {
      setCount(e.target.value.length);
      rest.onChange && rest.onChange(e);
    },
    style: {
      resize: 'vertical',
      minHeight: 44 * 1.4,
      padding: '12px 14px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? `0 0 0 3px var(--focus-ring)` : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 500,
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-primary)',
      outline: 'none',
      transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)'
    }
  }, rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint), maxLength && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, count, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
/**
 * Renders a Lucide icon by name. Requires the Lucide UMD script to be loaded
 * on the page (window.lucide); renders nothing until it is.
 * This is the canonical icon for the whole system — always use named Lucide icons.
 */
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const lucide = typeof window !== 'undefined' ? window.lucide : null;
    if (!ref.current || !lucide || !lucide.icons) return;
    const key = String(name).split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    const node = lucide.icons[key];
    ref.current.innerHTML = '';
    if (node) {
      const svg = lucide.createElement(node);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke', color);
      svg.setAttribute('stroke-width', strokeWidth);
      ref.current.appendChild(svg);
    }
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/cards/CategoryCard.jsx
try { (() => {
const CONFIG = {
  food: {
    icon: 'utensils',
    title: 'Food',
    desc: 'Cooked meals & packaged food',
    accent: 'var(--food)',
    soft: 'var(--food-soft)',
    border: 'var(--orange-300)'
  },
  clothes: {
    icon: 'shirt',
    title: 'Clothes',
    desc: 'Garments for all seasons',
    accent: 'var(--clothes)',
    soft: 'var(--clothes-soft)',
    border: 'var(--teal-300)'
  }
};

/** Large tappable category selector for the Food vs Clothes donation choice. */
function CategoryCard({
  category,
  selected = false,
  title,
  description,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const c = CONFIG[category] || CONFIG.food;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      textAlign: 'left',
      width: '100%',
      cursor: 'pointer',
      background: selected ? c.soft : 'var(--surface-card)',
      border: `2px solid ${selected ? c.accent : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-xl)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: hover && !selected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'all var(--duration-base) var(--ease-standard)',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-lg)',
      background: c.soft,
      color: c.accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1.5px solid ${c.border}`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: c.icon,
    size: 28
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title || c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, description || c.desc)));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ConsumerCard.jsx
try { (() => {
/** Nearby consumer (NGO / shelter / community) row with distance + need size and a Select action. */
function ConsumerCard({
  name,
  type,
  distance,
  people,
  selected = false,
  onSelect,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: `1.5px solid ${selected ? 'var(--brand)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: selected ? '0 0 0 3px var(--focus-ring)' : 'var(--shadow-sm)',
      transition: 'all var(--duration-fast)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    accent: "clothes"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px 12px',
      marginTop: 3
    }
  }, type && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, type), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "users",
    size: 13
  }), people, " people"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 13
  }), distance, " km"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSelect,
    style: {
      flex: 'none',
      height: 38,
      padding: '0 16px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      background: selected ? 'var(--brand)' : 'var(--brand-soft)',
      color: selected ? '#fff' : 'var(--brand-strong)',
      transition: 'all var(--duration-fast)',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none'
    }
  }, selected ? 'Selected' : 'Select'));
}
Object.assign(__ds_scope, { ConsumerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ConsumerCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/DonationCard.jsx
try { (() => {
/** Summary card for a donation item — used in active lists and history. */
function DonationCard({
  category = 'food',
  title,
  meta = [],
  status,
  time,
  onClick,
  style = {}
}) {
  const isFood = category === 'food';
  const accent = isFood ? 'var(--food)' : 'var(--clothes)';
  const soft = isFood ? 'var(--food-soft)' : 'var(--clothes-soft)';
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      gap: 14,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)',
      transition: 'box-shadow var(--duration-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: soft,
      color: accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: isFood ? 'utensils' : 'shirt',
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), status && /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    status: status,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 12px',
      marginTop: 6
    }
  }, meta.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)'
    }
  }, m.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: m.icon,
    size: 13
  }), m.label))), time && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, time)));
}
Object.assign(__ds_scope, { DonationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/DonationCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/NotificationCard.jsx
try { (() => {
const TYPES = {
  status: {
    icon: 'refresh-cw',
    accent: 'var(--info)',
    soft: 'var(--info-soft)'
  },
  accepted: {
    icon: 'check-circle',
    accent: 'var(--status-accepted)',
    soft: 'var(--status-accepted-soft)'
  },
  reward: {
    icon: 'award',
    accent: 'var(--reward)',
    soft: 'var(--reward-soft)'
  },
  request: {
    icon: 'bell',
    accent: 'var(--brand)',
    soft: 'var(--brand-soft)'
  },
  delivered: {
    icon: 'package-check',
    accent: 'var(--status-delivered)',
    soft: 'var(--status-delivered-soft)'
  }
};

/** In-app notification row with type icon, message, time, and unread state. */
function NotificationCard({
  type = 'status',
  title,
  message,
  time,
  unread = false,
  onClick,
  style = {}
}) {
  const t = TYPES[type] || TYPES.status;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '13px 14px',
      background: unread ? 'var(--brand-soft)' : 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: t.soft,
      color: t.accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, time)), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2,
      lineHeight: 'var(--leading-snug)'
    }
  }, message)), unread && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--brand)',
      flex: 'none',
      marginTop: 5
    }
  }));
}
Object.assign(__ds_scope, { NotificationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/NotificationCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/RequestCard.jsx
try { (() => {
/** Incoming open request for a volunteer, with Accept / Decline actions. */
function RequestCard({
  category = 'food',
  title,
  donor,
  distance,
  people,
  time,
  onAccept,
  onDecline,
  style = {}
}) {
  const isFood = category === 'food';
  const accent = isFood ? 'var(--food)' : 'var(--clothes)';
  const soft = isFood ? 'var(--food-soft)' : 'var(--clothes-soft)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: soft,
      color: accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: isFood ? 'utensils' : 'shirt',
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), donor && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: 1
    }
  }, "from ", donor)), /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    tone: isFood ? 'food' : 'clothes',
    dot: false,
    size: "sm"
  }, isFood ? 'Food' : 'Clothes')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 16px',
      margin: '12px 0 14px'
    }
  }, people != null && /*#__PURE__*/React.createElement(Meta, {
    icon: "users",
    label: `Serves ${people}`
  }), distance != null && /*#__PURE__*/React.createElement(Meta, {
    icon: "navigation",
    label: `${distance} km away`
  }), time && /*#__PURE__*/React.createElement(Meta, {
    icon: "clock",
    label: time
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDecline,
    style: btn('var(--surface-card)', 'var(--text-secondary)', 'var(--border-strong)')
  }, "Decline"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAccept,
    style: btn('var(--brand)', '#fff', 'transparent', 'var(--shadow-brand)')
  }, "Accept")));
}
function Meta({
  icon,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }), label);
}
function btn(bg, fg, border, shadow = 'none') {
  return {
    flex: 1,
    height: 46,
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${border}`,
    background: bg,
    color: fg,
    boxShadow: shadow,
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-body)',
    fontWeight: 700,
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  };
}
Object.assign(__ds_scope, { RequestCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/RequestCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/VolunteerCard.jsx
try { (() => {
/** Volunteer contact card — shown to the donor once a volunteer accepts, and in the team list. */
function VolunteerCard({
  name,
  role = 'Volunteer',
  phone,
  rating,
  distance,
  accent = 'brand',
  onCall,
  onMessage,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-sm)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    accent: accent,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px 12px',
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, role), rating != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: 12,
    color: "var(--reward)"
  }), rating), distance != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 12
  }), distance, " km")), phone && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      marginTop: 4,
      fontFamily: 'var(--font-mono)'
    }
  }, phone)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, onMessage && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onMessage,
    "aria-label": "Message",
    style: iconBtn('var(--surface-sunken)', 'var(--text-primary)')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "message-circle",
    size: 18
  })), onCall && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCall,
    "aria-label": "Call",
    style: iconBtn('var(--brand)', '#fff')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 18
  }))));
}
function iconBtn(bg, fg) {
  return {
    width: 44,
    height: 44,
    flex: 'none',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: bg,
    color: fg,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  };
}
Object.assign(__ds_scope, { VolunteerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/VolunteerCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/BottomSheet.jsx
try { (() => {
/** Bottom sheet / modal. Renders an overlay + rounded sheet when `open`. */
function BottomSheet({
  open,
  title,
  onClose,
  children,
  footer,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      background: 'var(--surface-overlay)',
      display: 'flex',
      alignItems: 'flex-end',
      animation: 'plenty-fade var(--duration-base) var(--ease-standard)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes plenty-fade{from{opacity:0}to{opacity:1}}@keyframes plenty-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}`), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
      padding: '10px 20px calc(20px + env(safe-area-inset-bottom, 0))',
      boxShadow: 'var(--shadow-xl)',
      maxHeight: '90%',
      overflowY: 'auto',
      animation: 'plenty-rise var(--duration-slow) var(--ease-emphasized)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: 'var(--border-strong)',
      margin: '4px auto 14px'
    }
  }), title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 36,
      height: 36,
      border: 'none',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  }))), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, footer)));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/** Supportive empty state: icon, title, message, optional action. */
function EmptyState({
  icon = 'inbox',
  title,
  message,
  action,
  accent = 'brand',
  compact = false,
  style = {}
}) {
  const accents = {
    brand: ['var(--brand-soft)', 'var(--brand)'],
    food: ['var(--food-soft)', 'var(--food)'],
    clothes: ['var(--clothes-soft)', 'var(--clothes)'],
    neutral: ['var(--surface-sunken)', 'var(--text-muted)']
  };
  const [bg, fg] = accents[accent] || accents.brand;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: compact ? '24px 20px' : '40px 24px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: compact ? 56 : 72,
      height: compact ? 56 : 72,
      borderRadius: 'var(--radius-xl)',
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: compact ? 28 : 34
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-secondary)',
      marginTop: 6,
      maxWidth: 280,
      lineHeight: 'var(--leading-normal)'
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/MapPlaceholder.jsx
try { (() => {
/**
 * Stylized map placeholder with a radius ring and pins.
 * pins = [{ x, y, accent, label, you }]  — x/y are 0–100 (% of the frame).
 * No external tiles/images; purely CSS so it works offline.
 */
function MapPlaceholder({
  pins = [],
  radiusLabel = '10 km',
  height = 220,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height,
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      background: 'radial-gradient(120% 120% at 50% 40%, #EEF4EC 0%, #E6EDE6 55%, #DCE6E2 100%)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,0.9) 38px 41px), \
           repeating-linear-gradient(0deg, transparent 0 46px, rgba(255,255,255,0.9) 46px 49px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(60deg, transparent 46%, rgba(255,255,255,0.95) 47% 50%, transparent 51%)',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '78%',
      paddingBottom: '78%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background: 'rgba(31,157,87,0.10)',
      border: '2px dashed rgba(31,157,87,0.45)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 'calc(50% - 39%)',
      transform: 'translate(-50%,-50%)',
      fontSize: 11,
      fontWeight: 800,
      color: 'var(--brand-strong)',
      background: 'var(--surface-card)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, radiusLabel, " radius"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--brand)',
      border: '3px solid #fff',
      boxShadow: 'var(--shadow-md)'
    }
  })), pins.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: `${p.x}%`,
      top: `${p.y}%`,
      transform: 'translate(-50%,-100%)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: p.you ? 'var(--brand)' : p.accent || 'var(--food)',
      filter: 'drop-shadow(0 3px 4px rgba(26,23,20,0.25))'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 30,
    strokeWidth: 2.5,
    color: p.you ? 'var(--brand)' : p.accent || 'var(--food)'
  })), p.label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10,
      fontWeight: 800,
      color: 'var(--text-primary)',
      background: 'var(--surface-card)',
      padding: '1px 6px',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--shadow-xs)',
      marginTop: -4,
      whiteSpace: 'nowrap'
    }
  }, p.label))));
}
Object.assign(__ds_scope, { MapPlaceholder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/MapPlaceholder.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    fg: 'var(--green-700)',
    bg: 'var(--success-soft)',
    border: 'var(--green-200)',
    icon: 'check-circle'
  },
  error: {
    fg: 'var(--red-500)',
    bg: 'var(--error-soft)',
    border: '#F3C9C4',
    icon: 'alert-circle'
  },
  warning: {
    fg: 'var(--gold-600)',
    bg: 'var(--warning-soft)',
    border: '#F1DFA6',
    icon: 'alert-triangle'
  },
  info: {
    fg: 'var(--text-primary)',
    bg: 'var(--surface-inverse)',
    border: 'transparent',
    icon: 'info'
  }
};

/** Snackbar/toast. Render fixed near the bottom; auto-dismiss handled by the caller. */
function Toast({
  message,
  tone = 'info',
  icon,
  action,
  onAction,
  onClose,
  style = {}
}) {
  const t = TONES[tone] || TONES.info;
  const dark = tone === 'info';
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: t.bg,
      color: dark ? '#fff' : t.fg,
      border: `1px solid ${t.border}`,
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)',
      maxWidth: 360,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || t.icon,
    size: 20,
    color: dark ? '#fff' : t.fg
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: dark ? '#fff' : 'var(--text-primary)'
    }
  }, message), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: dark ? 'var(--green-300)' : t.fg,
      fontWeight: 800,
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, action), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: dark ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
      display: 'inline-flex',
      padding: 0,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppBar.jsx
try { (() => {
/** Top app bar: optional back, centered or left title, optional action slot. */
function AppBar({
  title,
  subtitle,
  onBack,
  action,
  align = 'left',
  transparent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--appbar-height)',
      padding: '0 8px 0 6px',
      background: transparent ? 'transparent' : 'var(--surface-card)',
      borderBottom: transparent ? 'none' : '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    "aria-label": "Back",
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      border: 'none',
      background: 'transparent',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--text-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: align === 'center' ? 'center' : 'left',
      paddingLeft: onBack ? 0 : 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: -1
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, action), align === 'center' && onBack && !action && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      flex: 'none'
    }
  }));
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
/**
 * Role-aware bottom tab bar. `items` = [{key,label,icon,badge}].
 * Active tab colored brand; raised center FAB optional via item.fab.
 */
function BottomNav({
  items = [],
  active,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      height: 'var(--bottomnav-height)',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-subtle)',
      paddingBottom: 'env(safe-area-inset-bottom, 0)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const on = it.key === active;
    if (it.fab) {
      return /*#__PURE__*/React.createElement("button", {
        key: it.key,
        type: "button",
        onClick: () => onChange && onChange(it.key),
        "aria-label": it.label,
        style: {
          flex: 1,
          border: 'none',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          outline: 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--brand)',
          color: '#fff',
          boxShadow: 'var(--shadow-brand)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(-12px)'
        }
      }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        name: it.icon,
        size: 26
      })));
    }
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onChange && onChange(it.key),
      style: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        color: on ? 'var(--brand-strong)' : 'var(--text-muted)',
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        position: 'relative',
        transition: 'color var(--duration-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 23,
      strokeWidth: on ? 2.4 : 2
    }), it.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -4,
        right: -7,
        minWidth: 16,
        height: 16,
        padding: '0 4px',
        borderRadius: 8,
        background: 'var(--error)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 800,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--surface-card)'
      }
    }, it.badge) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: on ? 700 : 600
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Segmented in-page tabs for filtering/sectioning. `items` = [{key,label}]. */
function Tabs({
  items = [],
  active,
  onChange,
  variant = 'segmented',
  style = {}
}) {
  if (variant === 'underline') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, items.map(it => {
      const on = it.key === active;
      return /*#__PURE__*/React.createElement("button", {
        key: it.key,
        type: "button",
        onClick: () => onChange && onChange(it.key),
        style: {
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: '10px 14px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 700,
          color: on ? 'var(--brand-strong)' : 'var(--text-muted)',
          borderBottom: `2.5px solid ${on ? 'var(--brand)' : 'transparent'}`,
          marginBottom: -1,
          WebkitTapHighlightColor: 'transparent',
          outline: 'none'
        }
      }, it.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onChange && onChange(it.key),
      style: {
        flex: 1,
        border: 'none',
        cursor: 'pointer',
        height: 38,
        borderRadius: 'var(--radius-sm)',
        background: on ? 'var(--surface-card)' : 'transparent',
        color: on ? 'var(--text-primary)' : 'var(--text-muted)',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 700,
        transition: 'all var(--duration-fast)',
        WebkitTapHighlightColor: 'transparent',
        outline: 'none'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/AdminScreens.jsx
try { (() => {
/* Plenty — Admin role screens (lightweight) */
const {
  Page: PA,
  SectionHeader: SHA
} = window;
const A = window.PlentyDesignSystem_a440a4;
const VEHICLE_TYPES = ['Two-wheeler', 'Auto rickshaw', 'Cargo van', 'Car'];
const vIcon = type => type === 'Cargo van' ? 'truck' : type === 'Two-wheeler' ? 'bike' : type === 'Car' ? 'car' : 'caravan';
function AdmTransport(ctx) {
  const {
    AppBar,
    Icon,
    Switch,
    IconButton,
    Chip,
    Input,
    Select,
    Button,
    BottomSheet
  } = A;
  const [fleet, setFleet] = React.useState(ctx.data.TRANSPORT);
  const [filter, setFilter] = React.useState('all');
  const [editing, setEditing] = React.useState(null); // vehicle object or 'new'
  const [form, setForm] = React.useState({
    type: 'Two-wheeler',
    plate: '',
    driver: '',
    status: 'AVAILABLE'
  });
  const toggle = id => setFleet(fleet.map(t => t.id === id ? {
    ...t,
    status: t.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE'
  } : t));
  const openEdit = v => {
    setForm({
      type: v.type,
      plate: v.plate,
      driver: v.driver,
      status: v.status
    });
    setEditing(v);
  };
  const openNew = () => {
    setForm({
      type: 'Two-wheeler',
      plate: '',
      driver: 'Unassigned',
      status: 'AVAILABLE'
    });
    setEditing('new');
  };
  const save = () => {
    if (editing === 'new') {
      setFleet(f => [...f, {
        id: 't' + Date.now(),
        ...form
      }]);
      ctx.toast('Vehicle added', 'success');
    } else {
      setFleet(f => f.map(t => t.id === editing.id ? {
        ...t,
        ...form
      } : t));
      ctx.toast('Vehicle updated', 'success');
    }
    setEditing(null);
  };
  const remove = () => {
    setFleet(f => f.filter(t => t.id !== editing.id));
    setEditing(null);
    ctx.toast('Vehicle removed');
  };
  const counts = VEHICLE_TYPES.reduce((m, ty) => {
    m[ty] = fleet.filter(v => v.type === ty).length;
    return m;
  }, {});
  const filtered = filter === 'all' ? fleet : fleet.filter(v => v.type === filter);
  const types = ['all', ...VEHICLE_TYPES.filter(ty => counts[ty] > 0)];
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Transport",
      align: "center",
      action: /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "Add vehicle",
        variant: "brand",
        onClick: openNew
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 20
      }))
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 4,
      marginBottom: 14
    }
  }, types.map(ty => /*#__PURE__*/React.createElement(Chip, {
    key: ty,
    accent: "neutral",
    selected: filter === ty,
    leftIcon: ty !== 'all' ? /*#__PURE__*/React.createElement(Icon, {
      name: vIcon(ty),
      size: 15
    }) : null,
    onClick: () => setFilter(ty),
    style: {
      flex: 'none'
    }
  }, ty === 'all' ? `All · ${fleet.length}` : `${ty} · ${counts[ty]}`))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, filtered.map(t => {
    const avail = t.status === 'AVAILABLE';
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 14,
        boxShadow: 'var(--shadow-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        flex: 'none',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sunken)',
        color: 'var(--text-primary)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: vIcon(t.type),
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, t.type), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)'
      }
    }, t.plate, " \xB7 ", t.driver)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: avail ? 'var(--success)' : 'var(--warning)',
        marginBottom: 5
      }
    }, t.status), /*#__PURE__*/React.createElement(Switch, {
      checked: avail,
      onChange: () => toggle(t.id)
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => openEdit(t),
      "aria-label": "Edit vehicle",
      style: {
        width: 36,
        height: 36,
        flex: 'none',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        background: 'var(--surface-sunken)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 16
    }))));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      padding: 16,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }
  }, "No ", filter, " vehicles.")), /*#__PURE__*/React.createElement(BottomSheet, {
    open: !!editing,
    title: editing === 'new' ? 'Add vehicle' : 'Edit vehicle',
    onClose: () => setEditing(null),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: !form.plate.trim(),
      onClick: save
    }, editing === 'new' ? 'Add vehicle' : 'Save changes')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Vehicle type",
    value: form.type,
    onChange: e => setForm(f => ({
      ...f,
      type: e.target.value
    })),
    options: VEHICLE_TYPES.map(ty => ({
      value: ty,
      label: ty
    }))
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Plate number",
    value: form.plate,
    onChange: e => setForm(f => ({
      ...f,
      plate: e.target.value
    })),
    placeholder: "MH 02 AB 1234",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "hash",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Driver",
    value: form.driver,
    onChange: e => setForm(f => ({
      ...f,
      driver: e.target.value
    })),
    placeholder: "Name or Unassigned",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Available now",
    checked: form.status === 'AVAILABLE',
    onChange: v => setForm(f => ({
      ...f,
      status: v ? 'AVAILABLE' : 'BUSY'
    }))
  }), editing !== 'new' && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: remove,
    style: {
      marginTop: 4,
      height: 44,
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--error)',
      background: 'var(--error-soft)',
      color: 'var(--error)',
      fontWeight: 700,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 16
  }), "Remove vehicle"))));
}
function AdmAllocations(ctx) {
  const {
    AppBar,
    StatusBadge,
    Tabs,
    Icon,
    BottomSheet
  } = A;
  const [f, setF] = React.useState('all');
  const [sel, setSel] = React.useState(null);
  let list = ctx.data.ALLOCATIONS;
  if (f === 'active') list = list.filter(a => !['completed', 'cancelled'].includes(a.status));
  if (f === 'done') list = list.filter(a => a.status === 'completed');
  const proofs = ctx.proofs || {};
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Allocations",
      align: "center"
    })
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "underline",
    active: f,
    onChange: setF,
    items: [{
      key: 'all',
      label: 'All'
    }, {
      key: 'active',
      label: 'Active'
    }, {
      key: 'done',
      label: 'Completed'
    }],
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden'
    }
  }, list.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    onClick: () => setSel(a),
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: '13px 16px',
      borderBottom: i < list.length - 1 ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, a.item), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, a.consumer, " \xB7 ", a.volunteer)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status,
    size: "sm"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: !!sel,
    title: sel ? sel.item : '',
    onClose: () => setSel(null)
  }, sel && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "Current status"), /*#__PURE__*/React.createElement(StatusBadge, {
    status: sel.status,
    size: "sm"
  })), /*#__PURE__*/React.createElement(window.DetailRow, {
    icon: "building-2",
    label: "Recipient",
    value: sel.consumer
  }), /*#__PURE__*/React.createElement(window.DetailRow, {
    icon: "bike",
    label: "Volunteer",
    value: sel.volunteer
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: 'var(--text-primary)',
      marginBottom: 10
    }
  }, "Photo proof"), Object.keys(proofs).length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, Object.keys(proofs).map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      aspectRatio: '1'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: proofs[k],
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--success)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--text-secondary)',
      textAlign: 'center',
      marginTop: 5,
      textTransform: 'capitalize'
    }
  }, k.replace('_', ' '))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      padding: '14px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }
  }, "No photo proof uploaded yet. Volunteers attach a photo at each status update.")))));
}
function AdmAudit(ctx) {
  const {
    AppBar,
    Icon
  } = A;
  const log = [{
    icon: 'check-circle',
    accent: 'var(--success)',
    text: 'Allocation #al2 completed',
    who: 'Meera Nair',
    time: '12 min ago'
  }, {
    icon: 'truck',
    accent: 'var(--info)',
    text: 'Vehicle MH 02 CD 4490 set Available',
    who: 'System',
    time: '38 min ago'
  }, {
    icon: 'user-plus',
    accent: 'var(--status-accepted)',
    text: 'New volunteer onboarded',
    who: 'Daniel Joseph',
    time: '2 h ago'
  }, {
    icon: 'alert-triangle',
    accent: 'var(--warning)',
    text: 'Request #al6 unassigned > 30 min',
    who: 'System',
    time: '3 h ago'
  }, {
    icon: 'flag',
    accent: 'var(--food)',
    text: 'Allocation #al1 picked up',
    who: 'Ravi Kumar',
    time: '4 h ago'
  }];
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Audit log",
      align: "center"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, log.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      color: l.accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: l.icon,
    size: 18,
    color: l.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, l.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, l.who, " \xB7 ", l.time))))));
}
window.AdminScreens = {
  AdmTransport,
  AdmAllocations,
  AdmAudit
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/AdminScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/ConsumerScreens.jsx
try { (() => {
/* Plenty — Consumer (NGO / shelter) role screens */
const {
  Page: PC,
  Hero: HeroC,
  SectionHeader: SHC
} = window;
const C = window.PlentyDesignSystem_a440a4;
function ConHome(ctx) {
  const {
    Icon,
    StatCard,
    DonationCard,
    StatusBadge,
    Button,
    Avatar
  } = C;
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    pad: false,
    header: /*#__PURE__*/React.createElement(HeroC, {
      accent: "var(--teal-500)",
      accent2: "var(--teal-700)",
      eyebrow: "Recipient",
      title: ctx.profile.name,
      right: /*#__PURE__*/React.createElement(Avatar, {
        name: ctx.profile.name,
        src: ctx.profile.photo,
        accent: "clothes",
        ring: true,
        style: {
          boxShadow: '0 0 0 2px rgba(255,255,255,0.5)'
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '12px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.85,
        fontWeight: 600
      }
    }, "Current need"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 800
      }
    }, "Meals for 40 people")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => ctx.go('c-need'),
      style: {
        height: 36,
        padding: '0 14px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: '#fff',
        color: 'var(--teal-700)',
        fontWeight: 700,
        fontSize: 13,
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)'
      }
    }, "Update")))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0',
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "214",
    label: "Meals received",
    accent: "food",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "utensils"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "86",
    label: "Items received",
    accent: "clothes",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "shirt"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(SHC, {
    title: "Incoming donations"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ctx.data.CONSUMER_INCOMING.map(d => /*#__PURE__*/React.createElement(DonationCard, {
    key: d.id,
    category: d.category,
    title: d.title,
    status: d.status,
    time: `${d.eta} · from ${d.donor}`,
    meta: []
  }))), /*#__PURE__*/React.createElement(SHC, {
    title: "Recently received",
    action: "Reports",
    onAction: () => ctx.go('c-reports')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ctx.data.CONSUMER_RECEIVED.map(d => /*#__PURE__*/React.createElement(DonationCard, {
    key: d.id,
    category: d.category,
    title: d.title,
    status: "completed",
    time: `${d.time} · from ${d.donor}`,
    meta: []
  })))));
}
function ConNeed(ctx) {
  const {
    AppBar,
    Input,
    Select,
    Textarea,
    Button,
    Chip,
    Icon
  } = C;
  const [prefs, setPrefs] = React.useState(['food']);
  const toggle = k => setPrefs(prefs.includes(k) ? prefs.filter(x => x !== k) : [...prefs, k]);
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Register need",
      onBack: ctx.back
    }),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      onClick: () => {
        ctx.toast('Need updated', 'success');
        ctx.back();
      }
    }, "Save need")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Place / organization",
    defaultValue: "Hope Shelter",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "building-2",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Number of people",
    type: "number",
    defaultValue: "40",
    required: true,
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      marginBottom: 8
    }
  }, "Category preference"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    selected: prefs.includes('food'),
    accent: "food",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "utensils",
      size: 15
    }),
    onClick: () => toggle('food')
  }, "Food"), /*#__PURE__*/React.createElement(Chip, {
    selected: prefs.includes('clothes'),
    accent: "clothes",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "shirt",
      size: 15
    }),
    onClick: () => toggle('clothes')
  }, "Clothes"))), /*#__PURE__*/React.createElement(Input, {
    label: "Contact",
    defaultValue: "+91 98990 11020",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Notes for donors",
    maxLength: 140,
    placeholder: "We can receive deliveries between 11 AM and 9 PM."
  })));
}
function ConReports(ctx) {
  const {
    AppBar,
    Tabs,
    StatCard,
    Icon
  } = C;
  const [period, setPeriod] = React.useState('month');
  const bars = period === 'month' ? [{
    l: 'W1',
    v: 60
  }, {
    l: 'W2',
    v: 80
  }, {
    l: 'W3',
    v: 45
  }, {
    l: 'W4',
    v: 95
  }] : [{
    l: 'Q1',
    v: 55
  }, {
    l: 'Q2',
    v: 70
  }, {
    l: 'Q3',
    v: 90
  }, {
    l: 'Q4',
    v: 100
  }];
  const max = 100;
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Reports",
      align: "center"
    })
  }, /*#__PURE__*/React.createElement(Tabs, {
    active: period,
    onChange: setPeriod,
    items: [{
      key: 'month',
      label: 'Monthly'
    }, {
      key: 'year',
      label: 'Yearly'
    }],
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: period === 'month' ? '214' : '2,480',
    label: "Meals received",
    accent: "food",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "utensils"
    }),
    trend: "+12%"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: period === 'month' ? '86' : '910',
    label: "Items received",
    accent: "clothes",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "shirt"
    }),
    trend: "+8%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 18,
      boxShadow: 'var(--shadow-sm)',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      marginBottom: 16
    }
  }, "Donations received"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16,
      height: 130
    }
  }, bars.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 38,
      height: `${b.v / max * 100}%`,
      background: i === bars.length - 1 ? 'var(--brand)' : 'var(--green-200)',
      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
      transition: 'height var(--duration-slow)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, b.l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--brand-soft)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      marginTop: 12,
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-md)',
      background: 'var(--brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--green-800)',
      fontWeight: 600
    }
  }, "You served ", /*#__PURE__*/React.createElement("b", null, period === 'month' ? '300' : '3,390'), " people through Plenty ", period === 'month' ? 'this month' : 'this year', ".")));
}
window.ConsumerScreens = {
  ConHome,
  ConNeed,
  ConReports
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/ConsumerScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/DonorScreens.jsx
try { (() => {
/* Plenty — Donor role screens */
const {
  Page: PgD,
  Hero: HeroD,
  SectionHeader: SecD
} = window;
const D_UI = window.PlentyDesignSystem_a440a4;
function PhotoUpload({
  accent = 'var(--food)'
}) {
  const [filled, setFilled] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setFilled(!filled),
    style: {
      width: '100%',
      height: 96,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      border: `1.5px dashed ${filled ? accent : 'var(--border-strong)'}`,
      background: filled ? 'var(--food-soft)' : 'var(--surface-sunken)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      color: filled ? accent : 'var(--text-muted)',
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(D_UI.Icon, {
    name: filled ? 'image' : 'camera',
    size: 24,
    color: filled ? accent : 'var(--text-muted)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, filled ? 'photo_evidence.jpg' : 'Add photo evidence'));
}

/* ---------- Home dashboard ---------- */
function DonorHome(ctx) {
  const {
    Button,
    StatCard,
    DonationCard,
    Icon,
    IconButton
  } = D_UI;
  const active = ctx.data.DONATIONS.filter(d => ['requested', 'accepted', 'picked_up'].includes(d.status));
  const recent = ctx.data.DONATIONS.filter(d => ['completed', 'cancelled'].includes(d.status));
  return /*#__PURE__*/React.createElement(PgD, {
    nav: ctx.bottomNav,
    bg: "var(--surface-page)",
    pad: false,
    header: /*#__PURE__*/React.createElement(HeroD, {
      eyebrow: "Good evening",
      title: ctx.profile.name,
      right: /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "Notifications",
        variant: "soft",
        onClick: () => ctx.go('notifications'),
        style: {
          background: 'rgba(255,255,255,0.2)',
          color: '#fff'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "bell",
        size: 20,
        color: "#fff"
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        marginTop: 18,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800
      }
    }, "1,240"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.85,
        fontWeight: 600
      }
    }, "Reward points")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: 'rgba(255,255,255,0.25)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800
      }
    }, "38"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.85,
        fontWeight: 600
      }
    }, "People helped"))))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ctx.go('d-category'),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      cursor: 'pointer',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      fontFamily: 'var(--font-sans)',
      textAlign: 'left',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: 'var(--brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-brand)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hand-heart",
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "Donate something"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, "Food or clothes \u2014 takes a minute")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement(SecD, {
    title: "Active requests"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, active.map(d => /*#__PURE__*/React.createElement(DonationCard, {
    key: d.id,
    category: d.category,
    title: d.title,
    status: d.status,
    time: `To ${d.consumer}`,
    onClick: () => {
      ctx.setAllocation({
        ...d,
        current: d.status
      });
      ctx.go('d-track');
    },
    meta: [{
      icon: 'users',
      label: d.serves ? `Serves ${d.serves}` : d.pieces
    }, {
      icon: 'map-pin',
      label: `${d.distance} km`
    }]
  }))), /*#__PURE__*/React.createElement(SecD, {
    title: "Recent history",
    action: "See all",
    onAction: () => ctx.go('d-history')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, recent.slice(0, 2).map(d => /*#__PURE__*/React.createElement(DonationCard, {
    key: d.id,
    category: d.category,
    title: d.title,
    status: d.status,
    time: d.time,
    meta: [{
      icon: 'users',
      label: d.serves ? `Serves ${d.serves}` : d.pieces
    }]
  })))));
}

/* ---------- Category picker ---------- */
function DonorCategory(ctx) {
  const {
    CategoryCard,
    AppBar
  } = D_UI;
  return /*#__PURE__*/React.createElement(PgD, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "What are you donating?",
      onBack: ctx.back
    })
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-secondary)',
      margin: '4px 0 18px'
    }
  }, "Pick a category to get started."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(CategoryCard, {
    category: "food",
    selected: ctx.draft.category === 'food',
    onClick: () => {
      ctx.setDraft({
        category: 'food',
        needsVolunteer: null
      });
      ctx.go('d-form');
    }
  }), /*#__PURE__*/React.createElement(CategoryCard, {
    category: "clothes",
    selected: ctx.draft.category === 'clothes',
    onClick: () => {
      ctx.setDraft({
        category: 'clothes',
        needsVolunteer: null
      });
      ctx.go('d-form');
    }
  })));
}

/* ---------- Request form (conditional) ---------- */
function DonorForm(ctx) {
  const {
    AppBar,
    Input,
    Select,
    Textarea,
    Button,
    StatusBadge
  } = D_UI;
  const isFood = ctx.draft.category === 'food';
  const accent = isFood ? 'var(--food)' : 'var(--clothes)';
  return /*#__PURE__*/React.createElement(PgD, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: isFood ? 'Food details' : 'Clothes details',
      onBack: ctx.back,
      action: /*#__PURE__*/React.createElement(StatusBadge, {
        tone: isFood ? 'food' : 'clothes',
        dot: false
      }, isFood ? 'Food' : 'Clothes')
    }),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: ctx.draft.needsVolunteer == null,
      onClick: () => ctx.go('d-nearby'),
      style: ctx.draft.needsVolunteer == null ? {} : {
        background: accent,
        boxShadow: 'none'
      }
    }, ctx.draft.needsVolunteer == null ? 'Choose a delivery option' : 'Find nearby recipients')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      marginBottom: 8
    }
  }, "Do you need a volunteer to pick up & deliver? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--error)'
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    val: true,
    icon: 'bike',
    title: 'Yes, send a volunteer',
    desc: 'A nearby volunteer collects and delivers it'
  }, {
    val: false,
    icon: 'hand',
    title: "No, I'll hand it over myself",
    desc: 'You drop it off or the recipient collects'
  }].map(opt => {
    const on = ctx.draft.needsVolunteer === opt.val;
    return /*#__PURE__*/React.createElement("button", {
      key: String(opt.val),
      type: "button",
      onClick: () => ctx.setDraft({
        needsVolunteer: opt.val
      }),
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        background: on ? 'var(--brand-soft)' : 'var(--surface-card)',
        border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 14,
        fontFamily: 'var(--font-sans)',
        outline: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        flex: 'none',
        borderRadius: 'var(--radius-md)',
        background: on ? 'var(--brand)' : 'var(--surface-sunken)',
        color: on ? '#fff' : 'var(--text-secondary)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(D_UI.Icon, {
      name: opt.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--text-primary)'
      }
    }, opt.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, opt.desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        flex: 'none',
        borderRadius: '50%',
        border: `2px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`,
        background: on ? 'var(--brand)' : 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement(D_UI.Icon, {
      name: "check",
      size: 13,
      color: "#fff"
    })));
  }))), isFood ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    label: "How many people does it serve?",
    type: "number",
    placeholder: "e.g. 12",
    required: true,
    leftIcon: /*#__PURE__*/React.createElement(D_UI.Icon, {
      name: "users",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Food type",
    required: true,
    placeholder: "Choose\u2026",
    options: [{
      value: 'cooked',
      label: 'Cooked meal'
    }, {
      value: 'packaged',
      label: 'Packaged food'
    }, {
      value: 'raw',
      label: 'Raw ingredients'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Best before",
    type: "text",
    defaultValue: "Today, 8:00 PM",
    leftIcon: /*#__PURE__*/React.createElement(D_UI.Icon, {
      name: "clock",
      size: 18
    }),
    hint: "Food freshness window"
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Description",
    maxLength: 120,
    placeholder: "Veg biryani, freshly cooked, mildly spiced"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
    label: "Clothing type",
    required: true,
    placeholder: "Choose\u2026",
    options: [{
      value: 'men',
      label: "Men's"
    }, {
      value: 'women',
      label: "Women's"
    }, {
      value: 'kids',
      label: 'Kids'
    }, {
      value: 'winter',
      label: 'Winter wear'
    }, {
      value: 'general',
      label: 'General'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Size range",
    placeholder: "S\u2013XL",
    containerStyle: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Quantity",
    placeholder: "3 bags",
    containerStyle: {
      flex: 1
    },
    leftIcon: /*#__PURE__*/React.createElement(D_UI.Icon, {
      name: "package",
      size: 18
    })
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Condition",
    required: true,
    placeholder: "Choose\u2026",
    options: [{
      value: 'new',
      label: 'New'
    }, {
      value: 'gently',
      label: 'Gently used'
    }]
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Description",
    maxLength: 120,
    placeholder: "Warm jackets, mixed sizes, freshly washed"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      marginBottom: 6
    }
  }, "Pickup location"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      background: 'var(--surface-card)',
      border: '1.5px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(D_UI.Icon, {
    name: "map-pin",
    size: 18,
    color: accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, "12 Carter Rd, Bandra West"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--brand-strong)'
    }
  }, "Auto-detected"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      marginBottom: 6
    }
  }, "Photo evidence ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--error)'
    }
  }, "*")), /*#__PURE__*/React.createElement(PhotoUpload, {
    accent: accent
  }))));
}
window.DonorScreens = {
  DonorHome,
  DonorCategory,
  DonorForm
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/DonorScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/DonorScreens2.jsx
try { (() => {
/* Plenty — Donor role screens (part 2): nearby, tracking, rewards, history */
const {
  Page: P2,
  Hero: Hero2,
  SectionHeader: SH2,
  DetailRow: DR2
} = window;
const D2 = window.PlentyDesignSystem_a440a4;

/* ---------- Nearby consumers (map + list) ---------- */
function DonorNearby(ctx) {
  const {
    AppBar,
    MapPlaceholder,
    ConsumerCard,
    Button,
    Tabs
  } = D2;
  const [view, setView] = React.useState('map');
  const [picked, setPicked] = React.useState(null);
  const list = ctx.data.CONSUMERS;
  const pins = list.map((c, i) => ({
    x: [30, 68, 44, 74][i] || 50,
    y: [34, 40, 64, 70][i] || 50,
    label: c.name.split(' ')[0],
    accent: ctx.draft.category === 'food' ? 'var(--food)' : 'var(--clothes)'
  }));
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Recipients within 10 km",
      subtitle: `${list.length} nearby · sorted by distance`,
      onBack: ctx.back
    }),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: !picked,
      onClick: () => {
        const c = list.find(x => x.id === picked);
        ctx.submitRequest(c);
      }
    }, picked ? 'Send request' : 'Select a recipient')
  }, /*#__PURE__*/React.createElement(Tabs, {
    active: view,
    onChange: setView,
    items: [{
      key: 'map',
      label: 'Map'
    }, {
      key: 'list',
      label: 'List'
    }],
    style: {
      marginBottom: 14
    }
  }), view === 'map' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(MapPlaceholder, {
    height: 200,
    radiusLabel: "10 km",
    pins: pins
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, list.map(c => /*#__PURE__*/React.createElement(ConsumerCard, {
    key: c.id,
    name: c.name,
    type: c.type,
    distance: c.distance,
    people: c.people,
    selected: picked === c.id,
    onSelect: () => setPicked(c.id)
  }))));
}

/* ---------- Status tracker ---------- */
function DonorTrack(ctx) {
  const {
    AppBar,
    Timeline,
    VolunteerCard,
    StatusBadge,
    Icon,
    Button
  } = D2;
  const a = ctx.allocation || {};
  const isFood = a.category === 'food';
  const accent = isFood ? 'var(--food)' : 'var(--clothes)';
  const selfHandover = a.needsVolunteer === false;
  const hasVolunteer = !selfHandover && a.current !== 'requested';
  const vol = ctx.data.VOLUNTEERS[0];
  const markHandover = () => {
    ctx.setAllocation({
      ...a,
      current: 'completed'
    });
    ctx.toast('Handover confirmed · +30 points 🎉', 'success');
  };
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Track donation",
      onBack: ctx.back
    }),
    footer: selfHandover && a.current !== 'completed' ? /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      onClick: markHandover,
      leftIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 18
      })
    }, "Mark as handed over") : a.current === 'requested' ? /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      variant: "destructive",
      onClick: () => {
        ctx.toast('Donation withdrawn');
        ctx.back();
      }
    }, "Cancel request") : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: isFood ? 'var(--food-soft)' : 'var(--clothes-soft)',
      color: accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isFood ? 'utensils' : 'shirt',
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "To ", a.consumer)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.current,
    size: "sm"
  })), selfHandover && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginTop: 12,
      padding: '12px 14px',
      background: 'var(--clothes-soft)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hand",
    size: 18,
    color: "var(--clothes)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--teal-700)',
      fontWeight: 600,
      lineHeight: 1.45
    }
  }, "Self handover \u2014 no volunteer. Arrange the drop-off with ", a.consumer, " directly.")), hasVolunteer && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SH2, {
    title: "Your volunteer"
  }), /*#__PURE__*/React.createElement(VolunteerCard, {
    name: vol.name,
    rating: vol.rating,
    distance: vol.distance,
    phone: vol.contact,
    onCall: () => ctx.toast('Calling ' + vol.name + '…'),
    onMessage: () => ctx.toast('Opening chat…')
  })), /*#__PURE__*/React.createElement(SH2, {
    title: "Progress"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 16px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Timeline, {
    current: a.current || 'requested',
    steps: selfHandover ? [{
      key: 'requested',
      label: 'Requested',
      time: '4:02 PM'
    }, {
      key: 'delivered',
      label: 'Handover arranged'
    }, {
      key: 'completed',
      label: 'Completed'
    }] : [{
      key: 'requested',
      label: 'Requested',
      time: '4:02 PM'
    }, {
      key: 'accepted',
      label: 'Volunteer accepted',
      time: hasVolunteer ? '4:09 PM' : undefined
    }, {
      key: 'picked_up',
      label: 'Picked up',
      time: a.current === 'picked_up' ? '4:31 PM' : undefined
    }, {
      key: 'delivered',
      label: 'Delivered'
    }, {
      key: 'completed',
      label: 'Completed'
    }]
  })), !selfHandover && ctx.proofs && Object.keys(ctx.proofs).length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SH2, {
    title: "Proof from your volunteer"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      margin: '-4px 0 10px'
    }
  }, "Photos your volunteer uploaded at each step."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, Object.keys(ctx.proofs).map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      aspectRatio: '1'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ctx.proofs[k],
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--success)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--text-secondary)',
      textAlign: 'center',
      marginTop: 5,
      textTransform: 'capitalize'
    }
  }, k.replace('_', ' ')))))));
}

/* ---------- Rewards ---------- */
function DonorRewards(ctx) {
  const {
    Icon,
    StatCard
  } = D2;
  const ledger = [{
    reason: 'Winter jackets delivered',
    pts: 60,
    time: 'Yesterday'
  }, {
    reason: 'Rice & dal delivered',
    pts: 90,
    time: '2 days ago'
  }, {
    reason: 'Cooked meals delivered',
    pts: 45,
    time: '5 days ago'
  }, {
    reason: 'First donation bonus',
    pts: 100,
    time: 'Last month'
  }];
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    pad: false,
    header: /*#__PURE__*/React.createElement(Hero2, {
      accent: "var(--gold-400)",
      accent2: "var(--gold-600)",
      eyebrow: "Plenty Rewards",
      title: "Gold giver",
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "trophy",
        size: 24,
        color: "#fff"
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 800,
        lineHeight: 1
      }
    }, "1,240"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        opacity: 0.9,
        fontWeight: 600,
        marginTop: 4
      }
    }, "points \xB7 260 to Platinum"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.3)',
        marginTop: 12,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '82%',
        height: '100%',
        background: '#fff',
        borderRadius: 4
      }
    }))))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0',
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "38",
    label: "Donations",
    accent: "reward",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "gift"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "12",
    label: "This month",
    accent: "brand",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar"
    }),
    trend: "+4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(SH2, {
    title: "Points history"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: '0 16px'
    }
  }, ledger.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderBottom: i < ledger.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      background: 'var(--reward-soft)',
      color: 'var(--gold-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, l.reason), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, l.time)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: 'var(--gold-600)'
    }
  }, "+", l.pts))))));
}

/* ---------- History ---------- */
function DonorHistory(ctx) {
  const {
    AppBar,
    Tabs,
    DonationCard,
    EmptyState
  } = D2;
  const [filter, setFilter] = React.useState('all');
  let list = ctx.data.DONATIONS;
  if (filter === 'food') list = list.filter(d => d.category === 'food');
  if (filter === 'clothes') list = list.filter(d => d.category === 'clothes');
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Donation history",
      align: "center"
    })
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "underline",
    active: filter,
    onChange: setFilter,
    items: [{
      key: 'all',
      label: 'All'
    }, {
      key: 'food',
      label: 'Food'
    }, {
      key: 'clothes',
      label: 'Clothes'
    }],
    style: {
      marginBottom: 14
    }
  }), list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    compact: true,
    icon: "inbox",
    title: "Nothing here yet",
    message: "Donations you make will show up here."
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, list.map(d => /*#__PURE__*/React.createElement(DonationCard, {
    key: d.id,
    category: d.category,
    title: d.title,
    status: d.status,
    time: `${d.time} · ${d.consumer}`,
    meta: [{
      icon: 'users',
      label: d.serves ? `Serves ${d.serves}` : d.pieces
    }, d.points ? {
      icon: 'award',
      label: `+${d.points}`
    } : null].filter(Boolean)
  }))));
}
window.DonorScreens2 = {
  DonorNearby,
  DonorTrack,
  DonorRewards,
  DonorHistory
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/DonorScreens2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/SharedScreens.jsx
try { (() => {
/* Plenty — shared / onboarding screens */
const {
  Page: PS,
  SectionHeader: SHS
} = window;
const S = window.PlentyDesignSystem_a440a4;
const ROLES = [{
  key: 'donor',
  label: 'Donor',
  desc: 'Share surplus food or clothes',
  icon: 'hand-heart',
  accent: 'var(--brand)',
  soft: 'var(--brand-soft)'
}, {
  key: 'volunteer',
  label: 'Volunteer',
  desc: 'Pick up and deliver donations',
  icon: 'bike',
  accent: 'var(--food)',
  soft: 'var(--food-soft)'
}, {
  key: 'consumer',
  label: 'Recipient',
  desc: 'NGO, shelter or community',
  icon: 'building-2',
  accent: 'var(--clothes)',
  soft: 'var(--clothes-soft)'
}, {
  key: 'admin',
  label: 'Admin',
  desc: 'Manage transport & oversight',
  icon: 'shield-check',
  accent: 'var(--violet-500)',
  soft: 'var(--violet-50)'
}];
function Splash(ctx) {
  const {
    Button,
    Icon
  } = S;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      textAlign: 'center',
      background: 'linear-gradient(160deg, var(--green-500) 0%, var(--green-700) 100%)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      height: 96,
      borderRadius: 'var(--radius-2xl)',
      background: 'rgba(255,255,255,0.16)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mark || '../../assets/mark.svg',
    width: "64",
    height: "64",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      fontWeight: 800,
      letterSpacing: '-0.03em'
    }
  }, "plenty"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 500,
      opacity: 0.9,
      marginTop: 8,
      maxWidth: 260,
      lineHeight: 1.45
    }
  }, "Share what's spare. A neighbour nearby needs it today."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 'calc(28px + env(safe-area-inset-bottom,0))'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: () => ctx.go('roles'),
    style: {
      background: '#fff',
      color: 'var(--brand-strong)',
      boxShadow: 'none'
    },
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20,
      color: "var(--brand-strong)"
    })
  }, "Get started")));
}
function RoleSelect(ctx) {
  const {
    Icon
  } = S;
  return /*#__PURE__*/React.createElement(Page, {
    header: null,
    bg: "var(--surface-page)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: '-0.02em'
    }
  }, "Join as\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-secondary)',
      marginTop: 4,
      marginBottom: 22
    }
  }, "Choose how you'd like to use Plenty. You can switch anytime."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.key,
    type: "button",
    onClick: () => ctx.enterRole(r.key, true),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      cursor: 'pointer',
      textAlign: 'left',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      background: r.soft,
      color: r.accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 26,
    color: r.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, r.desc)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22,
    color: "var(--text-muted)"
  }))))));
}
function Auth(ctx) {
  const {
    AppBar,
    Tabs,
    Input,
    Button,
    Icon
  } = S;
  const [mode, setMode] = React.useState('login');
  const role = ROLES.find(r => r.key === ctx.pendingRole) || ROLES[0];
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "",
      onBack: () => ctx.go('roles'),
      transparent: true
    }),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      onClick: () => ctx.enterRole(ctx.pendingRole, false)
    }, mode === 'login' ? 'Log in' : 'Create account')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-lg)',
      background: role.soft,
      color: role.accent,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: role.icon,
    size: 28,
    color: role.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800
    }
  }, mode === 'login' ? 'Welcome back' : `Join as ${role.label}`)), /*#__PURE__*/React.createElement(Tabs, {
    active: mode,
    onChange: setMode,
    items: [{
      key: 'login',
      label: 'Log in'
    }, {
      key: 'register',
      label: 'Register'
    }],
    style: {
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, mode === 'register' && /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "Your name",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    defaultValue: "asha@example.com",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    })
  }), mode === 'register' && /*#__PURE__*/React.createElement(Input, {
    label: "Contact number",
    placeholder: "+91",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  })));
}
function Notifications(ctx) {
  const {
    AppBar,
    NotificationCard,
    EmptyState
  } = S;
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Notifications",
      onBack: ctx.back
    })
  }, ctx.data.NOTIFICATIONS.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "bell-off",
    title: "No notifications",
    message: "You're all caught up."
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ctx.data.NOTIFICATIONS.map(n => /*#__PURE__*/React.createElement(NotificationCard, {
    key: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    time: n.time,
    unread: n.unread,
    onClick: () => {}
  }))));
}
function Profile(ctx) {
  const {
    AppBar,
    Avatar,
    Switch,
    Icon,
    Button,
    Input,
    BottomSheet
  } = S;
  const [push, setPush] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const p = ctx.profile;
  const [draftName, setDraftName] = React.useState(p.name);
  const [draftPhoto, setDraftPhoto] = React.useState(p.photo);
  React.useEffect(() => {
    setDraftName(p.name);
    setDraftPhoto(p.photo);
  }, [p.name, p.photo, editing]);
  const save = () => {
    ctx.updateProfile(ctx.role, {
      name: draftName,
      photo: draftPhoto
    });
    setEditing(false);
    ctx.toast('Profile updated', 'success');
  };
  const items = [{
    icon: 'map-pin',
    label: 'Saved addresses'
  }, {
    icon: 'globe',
    label: 'Language',
    value: 'English'
  }, {
    icon: 'circle-help',
    label: 'Help & support'
  }];
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Profile",
      align: "center",
      action: /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => setEditing(true),
        style: {
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--brand-strong)',
          fontWeight: 700,
          fontSize: 14,
          fontFamily: 'var(--font-sans)'
        }
      }, "Edit")
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 0 18px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    src: p.photo,
    size: "xl",
    accent: "brand"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      marginTop: 12
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      textTransform: 'capitalize'
    }
  }, ctx.role, " \xB7 ", p.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: '4px 16px',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer'
    },
    onClick: () => setEditing(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600
    }
  }, "Edit profile"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer'
    },
    onClick: () => ctx.toast(it.label)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600
    }
  }, it.label), it.value && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, it.value), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: '13px 16px',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600
    }
  }, "Push notifications"), /*#__PURE__*/React.createElement(Switch, {
    checked: push,
    onChange: setPush
  })), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "secondary",
    onClick: () => ctx.go('roles'),
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "repeat",
      size: 18
    })
  }, "Switch role"), /*#__PURE__*/React.createElement(BottomSheet, {
    open: editing,
    title: "Edit profile",
    onClose: () => setEditing(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: !draftName.trim(),
      onClick: save
    }, "Save changes")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(window.PhotoPicker, {
    shape: "circle",
    size: 92,
    value: draftPhoto,
    onPick: setDraftPhoto,
    label: "Photo"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "Tap to choose from gallery")), /*#__PURE__*/React.createElement(Input, {
    label: "Display name",
    value: draftName,
    onChange: e => setDraftName(e.target.value),
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  })));
}
window.SharedScreens = {
  Splash,
  RoleSelect,
  Auth,
  Notifications,
  Profile,
  ROLES
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/SharedScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/VolunteerScreens.jsx
try { (() => {
/* Plenty — Volunteer role screens */
const {
  Page: PV,
  Hero: HeroV,
  SectionHeader: SHV,
  DetailRow: DRV
} = window;
const V = window.PlentyDesignSystem_a440a4;
function VolHome(ctx) {
  const {
    Switch,
    RequestCard,
    Icon,
    StatCard,
    EmptyState,
    Avatar,
    StatusBadge
  } = V;
  const [available, setAvailable] = React.useState(true);
  const [declined, setDeclined] = React.useState([]);
  const activeIds = (ctx.volActive || []).map(t => t.id);
  const requests = ctx.data.OPEN_REQUESTS.filter(r => !activeIds.includes(r.id) && !declined.includes(r.id));
  const activeTasks = (ctx.volActive || []).filter(t => t.current !== 'completed');
  const accept = r => ctx.acceptRequest(r);
  const decline = r => setDeclined(d => [...d, r.id]);
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    pad: false,
    header: /*#__PURE__*/React.createElement(HeroV, {
      accent: "var(--brand)",
      accent2: "var(--brand-strong)",
      eyebrow: "Volunteer",
      title: ctx.profile.name,
      right: /*#__PURE__*/React.createElement(Avatar, {
        name: ctx.profile.name,
        src: ctx.profile.photo,
        accent: "brand",
        ring: true,
        style: {
          boxShadow: '0 0 0 2px rgba(255,255,255,0.5)'
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '12px 16px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800
      }
    }, available ? 'Available' : 'Busy'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.85
      }
    }, available ? 'Receiving nearby requests' : 'Not receiving requests')), /*#__PURE__*/React.createElement(Switch, {
      checked: available,
      onChange: setAvailable
    })))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0',
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: String(132 + (ctx.volActive || []).filter(t => t.current === 'completed').length),
    label: "Total trips",
    accent: "brand",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "truck"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "3,480",
    label: "Reward points",
    accent: "reward",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "award"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(SHV, {
    title: `Active tasks · ${activeTasks.length}`
  }), activeTasks.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    compact: true,
    icon: "clipboard-list",
    title: "No active tasks",
    message: "Accept a nearby request and it'll show up here to pick up and deliver.",
    accent: "neutral"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, activeTasks.map(t => {
    const isFood = t.category === 'food';
    const accent = isFood ? 'var(--food)' : 'var(--clothes)';
    const soft = isFood ? 'var(--food-soft)' : 'var(--clothes-soft)';
    const action = {
      accepted: 'Pick up',
      picked_up: 'Deliver',
      delivered: 'Complete'
    }[t.current] || 'Continue';
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      type: "button",
      onClick: () => ctx.openVolTask(t.id),
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `4px solid ${accent}`,
        borderRadius: 'var(--radius-lg)',
        padding: 14,
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'var(--font-sans)',
        outline: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        flex: 'none',
        borderRadius: 'var(--radius-md)',
        background: soft,
        color: accent,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isFood ? 'utensils' : 'shirt',
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--text-primary)'
      }
    }, t.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      status: t.current,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, "to ", t.drop || 'recipient'))), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--brand-strong)'
      }
    }, action, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16
    })));
  })), /*#__PURE__*/React.createElement(SHV, {
    title: `Nearby requests${available ? ` · ${requests.length}` : ''}`
  }), !available ? /*#__PURE__*/React.createElement(EmptyState, {
    compact: true,
    icon: "moon",
    title: "You're offline",
    message: "Turn on availability to see nearby requests.",
    accent: "neutral"
  }) : requests.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    compact: true,
    icon: "check-check",
    title: "All caught up",
    message: "No open requests near you right now."
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, requests.map(r => /*#__PURE__*/React.createElement(RequestCard, {
    key: r.id,
    category: r.category,
    title: r.title,
    donor: r.donor,
    distance: r.distance,
    people: r.people,
    time: r.time,
    onAccept: () => accept(r),
    onDecline: () => decline(r)
  })))));
}
function VolTask(ctx) {
  const {
    AppBar,
    Timeline,
    StatusBadge,
    Button,
    Icon,
    Avatar,
    BottomSheet
  } = V;
  const t = (ctx.volActive || []).find(x => x.id === ctx.volTaskId) || ctx.volTask || {};
  const next = {
    accepted: 'picked_up',
    picked_up: 'delivered',
    delivered: 'completed'
  };
  const nextLabel = {
    accepted: 'Mark picked up',
    picked_up: 'Mark delivered',
    delivered: 'Complete delivery'
  };
  const proofWord = {
    picked_up: 'pickup',
    delivered: 'delivery',
    completed: 'completion'
  };
  const n = next[t.current];
  const [proofSheet, setProofSheet] = React.useState(false);
  const [photo, setPhoto] = React.useState(null);
  const [transportSheet, setTransportSheet] = React.useState(false);
  const taskProofs = t.proofs || {};
  const fleet = (ctx.data.TRANSPORT || []).filter(v => v.status === 'AVAILABLE');
  const assignTransport = v => {
    ctx.updateVolTask(t.id, {
      transport: v
    });
    setTransportSheet(false);
    ctx.toast(`${v.type} requested`, 'success');
  };
  const cancelTransport = () => {
    ctx.updateVolTask(t.id, {
      transport: null
    });
    ctx.toast('Transport request cancelled');
  };
  const confirmUpdate = () => {
    ctx.addProof(n, photo);
    ctx.updateVolTask(t.id, {
      current: n,
      proofs: {
        ...taskProofs,
        [n]: photo
      }
    });
    setProofSheet(false);
    setPhoto(null);
    ctx.toast(n === 'completed' ? '+45 points earned 🎉' : `Marked ${n.replace('_', ' ')} · photo saved`, 'success');
  };
  return /*#__PURE__*/React.createElement(Page, {
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Active task",
      onBack: ctx.back,
      action: /*#__PURE__*/React.createElement(StatusBadge, {
        status: t.current,
        size: "sm"
      })
    }),
    footer: t.current === 'completed' ? /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      variant: "secondary",
      onClick: ctx.back
    }, "Back to tasks") : /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      onClick: () => {
        setPhoto(null);
        setProofSheet(true);
      },
      leftIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "camera",
        size: 18
      })
    }, nextLabel[t.current])
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 8,
      color: 'var(--text-secondary)',
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 14
  }), t.distance, " km"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), t.time))), /*#__PURE__*/React.createElement(SHV, {
    title: "Pickup \u2014 donor"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    name: t.donor || 'Asha V.',
    sub: "12 Carter Rd, Bandra West",
    ctx: ctx,
    accent: "food"
  }), /*#__PURE__*/React.createElement(SHV, {
    title: "Drop-off \u2014 recipient location"
  }), /*#__PURE__*/React.createElement(LocationRow, {
    name: t.drop || 'Hope Shelter',
    sub: "Community shelter \xB7 serves 40",
    address: "48 Hill Road, Bandra West \xB7 Gate 2",
    ctx: ctx
  }), /*#__PURE__*/React.createElement(SHV, {
    title: "Update status"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 16px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Timeline, {
    current: t.current,
    steps: [{
      key: 'accepted',
      label: 'Accepted'
    }, {
      key: 'picked_up',
      label: 'Picked up from donor'
    }, {
      key: 'delivered',
      label: 'Delivered to recipient'
    }, {
      key: 'completed',
      label: 'Completed'
    }]
  })), Object.keys(taskProofs).length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SHV, {
    title: "Photo proof"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, Object.keys(taskProofs).map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      aspectRatio: '1',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: taskProofs[k],
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--success)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--text-secondary)',
      textAlign: 'center',
      marginTop: 5,
      textTransform: 'capitalize'
    }
  }, k.replace('_', ' ')))))), /*#__PURE__*/React.createElement(SHV, {
    title: "Transport",
    action: t.transport ? null : 'Optional'
  }), t.transport ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--brand-soft)',
      color: 'var(--brand-strong)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.transport.type === 'Cargo van' ? 'truck' : t.transport.type === 'Two-wheeler' ? 'bike' : 'car',
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, t.transport.type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, t.transport.plate, " \xB7 requested")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: cancelTransport,
    style: {
      flex: 'none',
      height: 36,
      padding: '0 12px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-strong)',
      background: 'var(--surface-card)',
      color: 'var(--text-secondary)',
      fontWeight: 700,
      fontSize: 13,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      outline: 'none'
    }
  }, "Cancel")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTransportSheet(true),
    style: {
      width: '100%',
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-card)',
      border: '1.5px dashed var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      color: 'var(--text-secondary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, "Request a vehicle"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Optional \u2014 for bulky or far deliveries")), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 20,
    color: "var(--brand-strong)"
  })), /*#__PURE__*/React.createElement(BottomSheet, {
    open: transportSheet,
    title: "Request transport",
    onClose: () => setTransportSheet(false)
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      margin: '0 0 14px',
      lineHeight: 1.5
    }
  }, "Pick an available vehicle to help carry this donation. This is optional \u2014 you can deliver on your own."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, fleet.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      padding: 14,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }
  }, "No vehicles available right now.") : fleet.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    type: "button",
    onClick: () => assignTransport(v),
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 12,
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      color: 'var(--text-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: v.type === 'Cargo van' ? 'truck' : v.type === 'Two-wheeler' ? 'bike' : 'car',
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, v.type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, v.plate)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  }))))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: proofSheet,
    title: `Photo proof — ${proofWord[n] || ''}`,
    onClose: () => setProofSheet(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: !photo,
      onClick: confirmUpdate
    }, photo ? 'Confirm update' : 'Add a photo to continue')
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      margin: '0 0 14px',
      lineHeight: 1.5
    }
  }, "A photo is required so the donor and admin can verify the ", proofWord[n], "."), /*#__PURE__*/React.createElement(window.PhotoPicker, {
    value: photo,
    onPick: setPhoto,
    size: 160,
    label: "Take / choose photo",
    accent: "var(--brand)"
  })));
}
function LocationRow({
  name,
  sub,
  address,
  ctx
}) {
  const {
    Icon
  } = V;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--clothes-soft)',
      color: 'var(--clothes)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, sub))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      marginTop: 12,
      padding: '10px 12px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 15,
    color: "var(--clothes)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      color: 'var(--text-secondary)',
      fontWeight: 600
    }
  }, address)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ctx.toast('Opening directions…'),
    style: {
      width: '100%',
      marginTop: 10,
      height: 42,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--clothes)',
      color: '#fff',
      fontWeight: 700,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 16
  }), "Get directions"));
}
function ContactRow({
  name,
  sub,
  ctx,
  accent
}) {
  const {
    Avatar,
    Icon
  } = V;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name,
    accent: accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, sub)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ctx.toast('Calling ' + name + '…'),
    "aria-label": "Call",
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--brand)',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 18
  })));
}
function VolTeam(ctx) {
  const {
    AppBar,
    VolunteerCard,
    Icon,
    Button,
    Input,
    Avatar,
    BottomSheet
  } = V;
  const [adding, setAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const nearby = (ctx.suggestions || []).filter(v => Number(v.distance) <= 15);
  const submit = () => {
    ctx.addMember({
      id: 'm' + Date.now(),
      name: name.trim(),
      trips: 0,
      rating: '—',
      distance: '—',
      status: 'AVAILABLE'
    });
    setAdding(false);
    setName('');
    setContact('');
  };
  return /*#__PURE__*/React.createElement(Page, {
    nav: ctx.bottomNav,
    header: /*#__PURE__*/React.createElement(AppBar, {
      title: "Your team",
      align: "center",
      action: /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => setAdding(true),
        style: {
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--brand-strong)',
          fontWeight: 700,
          fontSize: 14,
          fontFamily: 'var(--font-sans)'
        }
      }, "Add")
    })
  }, /*#__PURE__*/React.createElement(SHV, {
    title: `Team members · ${(ctx.team || []).length}`,
    style: {
      marginTop: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, (ctx.team || []).map(v => /*#__PURE__*/React.createElement(VolunteerCard, {
    key: v.id,
    name: v.name,
    role: `${v.trips} trips`,
    rating: v.rating !== '—' ? v.rating : undefined,
    distance: v.distance !== '—' ? v.distance : undefined,
    accent: "brand",
    onMessage: () => ctx.toast('Opening chat…')
  }))), /*#__PURE__*/React.createElement(SHV, {
    title: "Suggested nearby \xB7 within 15 km"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      margin: '-4px 0 12px',
      lineHeight: 1.5
    }
  }, "Plenty volunteers near you. Invite them to join your team."), nearby.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      padding: 16,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }
  }, "No new volunteers nearby right now.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, nearby.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.id,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: v.name,
    accent: "brand"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, v.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px 12px',
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 12,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 12,
    color: "var(--reward)"
  }), v.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 12,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 12
  }), v.distance, " km away"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ctx.addToTeam(v),
    style: {
      flex: 'none',
      height: 38,
      padding: '0 14px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--brand-soft)',
      color: 'var(--brand-strong)',
      fontWeight: 700,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-plus",
    size: 16
  }), "Add")))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: adding,
    title: "Add team member",
    onClose: () => setAdding(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg",
      disabled: !name.trim(),
      onClick: submit
    }, "Send invite")
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      margin: '0 0 14px',
      lineHeight: 1.5
    }
  }, "Invite someone to volunteer with your team. They'll get a request to join."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Full name",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Contact",
    value: contact,
    onChange: e => setContact(e.target.value),
    placeholder: "+91",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }))));
}
window.VolunteerScreens = {
  VolHome,
  VolTask,
  VolTeam
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/VolunteerScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Plenty — interactive prototype shell: routing, roles, device frame */
const APP_UI = window.PlentyDesignSystem_a440a4;
const NAVS = {
  donor: {
    items: [{
      key: 'home',
      label: 'Home',
      icon: 'home'
    }, {
      key: 'history',
      label: 'History',
      icon: 'clock'
    }, {
      key: 'donate',
      label: 'Donate',
      icon: 'plus',
      fab: true
    }, {
      key: 'rewards',
      label: 'Rewards',
      icon: 'award',
      badge: 2
    }, {
      key: 'profile',
      label: 'Profile',
      icon: 'user'
    }],
    route: {
      home: 'd-home',
      history: 'd-history',
      donate: 'd-category',
      rewards: 'd-rewards',
      profile: 'profile'
    },
    active: {
      'd-home': 'home',
      'd-history': 'history',
      'd-rewards': 'rewards',
      profile: 'profile'
    }
  },
  volunteer: {
    items: [{
      key: 'home',
      label: 'Requests',
      icon: 'inbox'
    }, {
      key: 'team',
      label: 'Team',
      icon: 'users'
    }, {
      key: 'profile',
      label: 'Profile',
      icon: 'user'
    }],
    route: {
      home: 'v-home',
      team: 'v-team',
      profile: 'profile'
    },
    active: {
      'v-home': 'home',
      'v-team': 'team',
      profile: 'profile'
    }
  },
  consumer: {
    items: [{
      key: 'home',
      label: 'Home',
      icon: 'home'
    }, {
      key: 'reports',
      label: 'Reports',
      icon: 'chart-column'
    }, {
      key: 'profile',
      label: 'Profile',
      icon: 'user'
    }],
    route: {
      home: 'c-home',
      reports: 'c-reports',
      profile: 'profile'
    },
    active: {
      'c-home': 'home',
      'c-reports': 'reports',
      profile: 'profile'
    }
  },
  admin: {
    items: [{
      key: 'transport',
      label: 'Transport',
      icon: 'truck'
    }, {
      key: 'alloc',
      label: 'Allocations',
      icon: 'list-checks'
    }, {
      key: 'audit',
      label: 'Audit',
      icon: 'scroll-text'
    }],
    route: {
      transport: 'a-transport',
      alloc: 'a-allocations',
      audit: 'a-audit'
    },
    active: {
      'a-transport': 'transport',
      'a-allocations': 'alloc',
      'a-audit': 'audit'
    }
  }
};
const TOP = {
  splash: {
    bg: 'var(--green-600)',
    dark: true
  },
  'd-home': {
    bg: 'var(--green-500)',
    dark: true
  },
  'd-rewards': {
    bg: 'var(--gold-400)',
    dark: true
  },
  'v-home': {
    bg: 'var(--green-500)',
    dark: true
  },
  'c-home': {
    bg: 'var(--teal-500)',
    dark: true
  }
};
function screenFor(route) {
  const D = window.DonorScreens,
    D2 = window.DonorScreens2,
    V = window.VolunteerScreens,
    C = window.ConsumerScreens,
    A = window.AdminScreens,
    S = window.SharedScreens;
  return {
    splash: S.Splash,
    roles: S.RoleSelect,
    auth: S.Auth,
    notifications: S.Notifications,
    profile: S.Profile,
    'd-home': D.DonorHome,
    'd-category': D.DonorCategory,
    'd-form': D.DonorForm,
    'd-nearby': D2.DonorNearby,
    'd-track': D2.DonorTrack,
    'd-rewards': D2.DonorRewards,
    'd-history': D2.DonorHistory,
    'v-home': V.VolHome,
    'v-task': V.VolTask,
    'v-team': V.VolTeam,
    'c-home': C.ConHome,
    'c-need': C.ConNeed,
    'c-reports': C.ConReports,
    'a-transport': A.AdmTransport,
    'a-allocations': A.AdmAllocations,
    'a-audit': A.AdmAudit
  }[route];
}
function RoleSwitcher({
  role,
  onPick,
  onReset
}) {
  const roles = window.SharedScreens.ROLES;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginRight: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mark || '../../assets/mark.svg',
    width: "22",
    height: "22",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }, "plenty"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "prototype")), roles.map(r => {
    const on = role === r.key;
    return /*#__PURE__*/React.createElement("button", {
      key: r.key,
      type: "button",
      onClick: () => onPick(r.key),
      style: {
        height: 32,
        padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        border: `1.5px solid ${on ? r.accent : 'var(--border-strong)'}`,
        background: on ? r.accent : 'var(--surface-card)',
        color: on ? '#fff' : 'var(--text-secondary)',
        fontWeight: 700,
        fontSize: 13,
        fontFamily: 'var(--font-sans)',
        outline: 'none'
      }
    }, r.label);
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onReset,
    "aria-label": "Restart",
    style: {
      height: 32,
      width: 32,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      border: '1.5px solid var(--border-strong)',
      background: 'var(--surface-card)',
      color: 'var(--text-secondary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(APP_UI.Icon, {
    name: "rotate-ccw",
    size: 15
  })));
}
function App() {
  const [route, setRoute] = React.useState('splash');
  const [stack, setStack] = React.useState([]);
  const [role, setRole] = React.useState(null);
  const [pendingRole, setPendingRole] = React.useState(null);
  const [draft, setDraftState] = React.useState({
    category: 'food'
  });
  const [allocation, setAllocation] = React.useState(null);
  const [volTask, setVolTask] = React.useState(null);
  const [volActive, setVolActive] = React.useState([]);
  const [volTaskId, setVolTaskId] = React.useState(null);
  const [toastMsg, setToastMsg] = React.useState(null);
  const [sheet, setSheet] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const [hydrated, setHydrated] = React.useState(false);
  const V = window.PLENTY_DATA.VOLUNTEERS;
  const [profiles, setProfiles] = React.useState({
    donor: {
      name: 'Asha Verma',
      photo: null,
      sub: 'Bandra West'
    },
    volunteer: {
      name: 'Ravi Kumar',
      photo: null,
      sub: '132 trips · Bandra'
    },
    consumer: {
      name: 'Hope Shelter',
      photo: null,
      sub: 'Community shelter'
    },
    admin: {
      name: 'Plenty Ops',
      photo: null,
      sub: 'Operations team'
    }
  });
  const [proofs, setProofs] = React.useState({});
  const [team, setTeam] = React.useState(() => V.slice(0, 2));
  const [suggestions, setSuggestions] = React.useState(() => V.slice(2).map(v => ({
    ...v,
    distance: Math.round((v.distance + 6) * 10) / 10
  })));
  React.useEffect(() => {
    const fit = () => {
      const vh = window.innerHeight,
        vw = window.innerWidth;
      setScale(Math.min(1, (vh - 150) / 844, (vw - 32) / 390));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  React.useEffect(() => {
    const id = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(id);
  }, []);
  const go = r => {
    setStack(s => [...s, route]);
    setRoute(r);
  };
  const back = () => setStack(s => {
    if (!s.length) return s;
    const cp = [...s];
    setRoute(cp.pop());
    return cp;
  });
  const setDraft = p => setDraftState(d => ({
    ...d,
    ...p
  }));
  const toast = (message, tone) => {
    setToastMsg({
      message,
      tone
    });
    clearTimeout(window.__plentyToast);
    window.__plentyToast = setTimeout(() => setToastMsg(null), 2600);
  };
  const enterRole = (rk, viaAuth) => {
    if (viaAuth) {
      setPendingRole(rk);
      go('auth');
      return;
    }
    setRole(rk);
    setPendingRole(rk);
    const home = {
      donor: 'd-home',
      volunteer: 'v-home',
      consumer: 'c-home',
      admin: 'a-transport'
    }[rk];
    setStack([]);
    setRoute(home);
  };
  const submitRequest = consumer => setSheet(consumer);
  const confirmSend = () => {
    const consumer = sheet;
    setSheet(null);
    const cat = draft.category;
    const needsVol = draft.needsVolunteer !== false;
    const alloc = {
      category: cat,
      title: cat === 'food' ? 'Cooked meal' : 'Clothes bundle',
      consumer: consumer.name,
      current: 'requested',
      distance: consumer.distance,
      serves: consumer.people,
      needsVolunteer: needsVol
    };
    setProofs({});
    setAllocation(alloc);
    setStack(['d-home']);
    setRoute('d-track');
    if (needsVol) {
      toast('Request sent to nearby volunteers', 'success');
      setTimeout(() => setAllocation(a => a ? {
        ...a,
        current: 'accepted'
      } : a), 2800);
    } else {
      toast('Recipient notified — arrange handover directly', 'success');
    }
  };
  const reset = () => {
    setRole(null);
    setStack([]);
    setRoute('splash');
    setAllocation(null);
  };
  const updateProfile = (rk, patch) => setProfiles(p => ({
    ...p,
    [rk]: {
      ...p[rk],
      ...patch
    }
  }));
  const addProof = (status, dataURL) => setProofs(p => ({
    ...p,
    [status]: dataURL
  }));
  const addToTeam = v => {
    setTeam(t => [...t, v]);
    setSuggestions(s => s.filter(x => x.id !== v.id));
    toast(`${v.name} added to your team`, 'success');
  };
  const addMember = m => {
    setTeam(t => [...t, m]);
    toast(`Invite sent to ${m.name}`, 'success');
  };
  const acceptRequest = r => {
    setVolActive(list => list.some(t => t.id === r.id) ? list : [...list, {
      ...r,
      current: 'accepted',
      proofs: {}
    }]);
    setVolTaskId(r.id);
    toast('Accepted — added to your active tasks', 'success');
    go('v-task');
  };
  const openVolTask = id => {
    setVolTaskId(id);
    go('v-task');
  };
  const updateVolTask = (id, patch) => setVolActive(list => list.map(t => t.id === id ? {
    ...t,
    ...patch
  } : t));

  // bottom nav for the active role
  let bottomNav = null;
  const cfg = role && NAVS[role];
  if (cfg) {
    const active = cfg.active[route] || '';
    bottomNav = /*#__PURE__*/React.createElement(APP_UI.BottomNav, {
      active: active,
      items: cfg.items,
      onChange: k => {
        setStack([]);
        setRoute(cfg.route[k]);
      }
    });
  }
  const ctx = {
    data: window.PLENTY_DATA,
    role,
    pendingRole,
    route,
    draft,
    allocation,
    volTask,
    go,
    back,
    setDraft,
    setAllocation,
    setVolTask,
    enterRole,
    submitRequest,
    toast,
    bottomNav,
    profiles,
    profile: profiles[role] || profiles.donor,
    updateProfile,
    proofs,
    addProof,
    team,
    suggestions,
    addToTeam,
    addMember,
    volActive,
    volTaskId,
    acceptRequest,
    openVolTask,
    updateVolTask
  };
  const ScreenFn = screenFor(route);
  const top = TOP[route] || {
    bg: 'var(--surface-card)',
    dark: false
  };
  if (!hydrated) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        background: 'radial-gradient(120% 80% at 50% 0%, #EDEAE4 0%, #E2DDD4 100%)'
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 16px',
      boxSizing: 'border-box',
      background: 'radial-gradient(120% 80% at 50% 0%, #EDEAE4 0%, #E2DDD4 100%)'
    }
  }, /*#__PURE__*/React.createElement(RoleSwitcher, {
    role: role,
    onPick: k => enterRole(k, false),
    onReset: reset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 390,
      height: 844,
      background: '#000',
      borderRadius: 52,
      padding: 5,
      boxShadow: '0 30px 70px rgba(26,23,20,0.4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'var(--surface-page)',
      borderRadius: 47,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      background: top.bg,
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(window.StatusBar, {
    dark: top.dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 104,
      height: 26,
      background: '#000',
      borderRadius: 14,
      zIndex: 5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      position: 'relative'
    }
  }, ScreenFn ? /*#__PURE__*/React.createElement(ScreenFn, _extends({
    key: route
  }, ctx)) : null, toastMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 84,
      zIndex: 60,
      display: 'flex',
      justifyContent: 'center',
      animation: 'plenty-toast 0.25s var(--ease-emphasized)'
    }
  }, /*#__PURE__*/React.createElement(APP_UI.Toast, {
    tone: toastMsg.tone || 'info',
    message: toastMsg.message
  })), /*#__PURE__*/React.createElement(APP_UI.BottomSheet, {
    open: !!sheet,
    title: "Send this request?",
    onClose: () => setSheet(null),
    footer: /*#__PURE__*/React.createElement(APP_UI.Button, {
      fullWidth: true,
      size: "lg",
      onClick: confirmSend
    }, draft.needsVolunteer === false ? 'Confirm donation' : 'Confirm & notify volunteers')
  }, sheet && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-secondary)',
      margin: '0 0 14px',
      lineHeight: 1.5
    }
  }, draft.needsVolunteer === false ? /*#__PURE__*/React.createElement(React.Fragment, null, "We'll let ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, sheet.name), " know your ", draft.category, " donation is ready. You'll arrange the handover directly \u2014 no volunteer involved.") : /*#__PURE__*/React.createElement(React.Fragment, null, "We'll broadcast your ", draft.category, " donation to volunteers within 10 km. The first to accept will handle pickup and delivery to ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, sheet.name), ".")), /*#__PURE__*/React.createElement(window.DetailRow, {
    icon: draft.needsVolunteer === false ? 'hand' : 'bike',
    label: "Delivery",
    value: draft.needsVolunteer === false ? 'Self handover' : 'Volunteer pickup & delivery'
  }), /*#__PURE__*/React.createElement(window.DetailRow, {
    icon: "users",
    label: "Recipient need",
    value: `${sheet.people} people · ${sheet.type}`
  }), /*#__PURE__*/React.createElement(window.DetailRow, {
    icon: "navigation",
    label: "Distance",
    value: `${sheet.distance} km away`
  }))))))), /*#__PURE__*/React.createElement("style", null, `@keyframes plenty-toast{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`));
}
class Boundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      err: false
    };
  }
  static getDerivedStateFromError() {
    return {
      err: true
    };
  }
  componentDidCatch() {
    requestAnimationFrame(() => this.setState({
      err: false
    }));
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}
function mountPlenty() {
  if (window.__plentyMounted) return;
  const ns = window.PlentyDesignSystem_a440a4;
  const ready = ns && ns.Icon && ns.BottomNav && ns.Toast && ns.BottomSheet && ns.Button && ns.Card && ns.CategoryCard && ns.AppBar && ns.VolunteerCard && ns.RequestCard && window.StatusBar && window.Page && window.Hero && window.PhotoPicker && window.DetailRow && window.DonorScreens && window.DonorScreens2 && window.VolunteerScreens && window.ConsumerScreens && window.AdminScreens && window.SharedScreens;
  if (!ready) {
    setTimeout(mountPlenty, 30);
    return;
  }
  window.__plentyMounted = true;
  try {
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Boundary, null, /*#__PURE__*/React.createElement(App, null)));
  } catch (e) {
    window.__plentyMounted = false;
    setTimeout(mountPlenty, 40);
  }
}
function startPlenty() {
  if (document.readyState === 'complete') {
    setTimeout(mountPlenty, 0);
  } else {
    window.addEventListener('load', () => setTimeout(mountPlenty, 0));
  }
}
// Do NOT auto-run: the design-system compiler bundles this file into _ds_bundle.js
// and would otherwise execute a second render. The HTML entry triggers the mount.
window.__plentyMount = startPlenty;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/data.js
try { (() => {
// Plenty — sample in-memory data for the prototype. No backend.
(function () {
  const DONORS = [{
    id: 'do1',
    name: 'Asha Verma',
    contact: '+91 98201 04412',
    area: 'Bandra West'
  }];
  const CONSUMERS = [{
    id: 'c1',
    name: 'Hope Shelter',
    type: 'Community shelter',
    distance: 2.4,
    people: 40,
    contact: '+91 98990 11020'
  }, {
    id: 'c2',
    name: 'Asha Sadan NGO',
    type: 'NGO',
    distance: 5.1,
    people: 18,
    contact: '+91 98990 22456'
  }, {
    id: 'c3',
    name: 'Seva Kitchen',
    type: 'Community kitchen',
    distance: 6.8,
    people: 65,
    contact: '+91 98990 33871'
  }, {
    id: 'c4',
    name: 'Little Stars Home',
    type: "Children's home",
    distance: 8.9,
    people: 24,
    contact: '+91 98990 44990'
  }];
  const VOLUNTEERS = [{
    id: 'v1',
    name: 'Ravi Kumar',
    rating: 4.9,
    distance: 1.2,
    contact: '+91 98111 22010',
    status: 'AVAILABLE',
    trips: 132
  }, {
    id: 'v2',
    name: 'Meera Nair',
    rating: 4.8,
    distance: 2.0,
    contact: '+91 98111 33422',
    status: 'AVAILABLE',
    trips: 98
  }, {
    id: 'v3',
    name: 'Sofia Khan',
    rating: 5.0,
    distance: 3.4,
    contact: '+91 98111 55890',
    status: 'BUSY',
    trips: 211
  }, {
    id: 'v4',
    name: 'Daniel Joseph',
    rating: 4.7,
    distance: 4.1,
    contact: '+91 98111 77341',
    status: 'AVAILABLE',
    trips: 54
  }];

  // Donor history / active donations
  const DONATIONS = [{
    id: 'al1',
    category: 'food',
    title: 'Veg biryani',
    serves: 12,
    distance: 2.4,
    status: 'picked_up',
    consumer: 'Hope Shelter',
    volunteer: 'Ravi Kumar',
    time: 'Today, 4:02 PM'
  }, {
    id: 'al2',
    category: 'clothes',
    title: 'Winter jackets',
    pieces: '3 bags',
    distance: 5.1,
    status: 'completed',
    consumer: 'Asha Sadan NGO',
    volunteer: 'Meera Nair',
    time: 'Yesterday',
    points: 60
  }, {
    id: 'al3',
    category: 'food',
    title: 'Packaged rice & dal',
    serves: 30,
    distance: 6.8,
    status: 'completed',
    consumer: 'Seva Kitchen',
    volunteer: 'Sofia Khan',
    time: '2 days ago',
    points: 90
  }, {
    id: 'al4',
    category: 'clothes',
    title: "Kids' clothing",
    pieces: '20 pieces',
    distance: 8.9,
    status: 'cancelled',
    consumer: 'Little Stars Home',
    volunteer: '—',
    time: '4 days ago'
  }];

  // Volunteer open requests (broadcast)
  const OPEN_REQUESTS = [{
    id: 'r1',
    category: 'food',
    title: 'Veg biryani · serves 12',
    donor: 'Asha V.',
    distance: 1.8,
    people: 12,
    time: 'Pickup before 8 PM',
    drop: 'Hope Shelter'
  }, {
    id: 'r2',
    category: 'clothes',
    title: 'Blankets · 2 bags',
    donor: 'Imran S.',
    distance: 2.6,
    people: 30,
    time: 'Pickup before 9 PM',
    drop: 'Seva Kitchen'
  }, {
    id: 'r3',
    category: 'food',
    title: 'Sandwiches · serves 20',
    donor: 'Neha P.',
    distance: 3.9,
    people: 20,
    time: 'Pickup before 7 PM',
    drop: 'Asha Sadan NGO'
  }];
  const NOTIFICATIONS = [{
    id: 'n1',
    type: 'accepted',
    title: 'Volunteer on the way',
    message: 'Ravi accepted your donation and is heading to pickup.',
    time: '2m',
    unread: true
  }, {
    id: 'n2',
    type: 'status',
    title: 'Picked up',
    message: 'Your veg biryani is on its way to Hope Shelter.',
    time: '18m',
    unread: true
  }, {
    id: 'n3',
    type: 'reward',
    title: '+60 points earned',
    message: 'Winter jackets delivered to Asha Sadan NGO.',
    time: '1d',
    unread: false
  }, {
    id: 'n4',
    type: 'delivered',
    title: 'Delivered',
    message: 'Packaged rice & dal reached Seva Kitchen.',
    time: '2d',
    unread: false
  }];
  const TRANSPORT = [{
    id: 't1',
    type: 'Two-wheeler',
    plate: 'MH 02 AB 1123',
    driver: 'Ravi Kumar',
    status: 'BUSY'
  }, {
    id: 't2',
    type: 'Cargo van',
    plate: 'MH 02 CD 4490',
    driver: 'Meera Nair',
    status: 'AVAILABLE'
  }, {
    id: 't3',
    type: 'Auto rickshaw',
    plate: 'MH 02 EF 7781',
    driver: 'Unassigned',
    status: 'AVAILABLE'
  }];
  const ALLOCATIONS = [{
    id: 'al1',
    item: 'Veg biryani',
    consumer: 'Hope Shelter',
    volunteer: 'Ravi Kumar',
    status: 'picked_up'
  }, {
    id: 'al5',
    item: 'Blankets',
    consumer: 'Seva Kitchen',
    volunteer: 'Meera Nair',
    status: 'accepted'
  }, {
    id: 'al2',
    item: 'Winter jackets',
    consumer: 'Asha Sadan NGO',
    volunteer: 'Meera Nair',
    status: 'completed'
  }, {
    id: 'al6',
    item: 'Bread & milk',
    consumer: 'Little Stars Home',
    volunteer: '—',
    status: 'requested'
  }];
  const CONSUMER_INCOMING = [{
    id: 'i1',
    category: 'food',
    title: 'Veg biryani · serves 12',
    donor: 'Asha V.',
    status: 'picked_up',
    eta: 'ETA 15 min'
  }, {
    id: 'i2',
    category: 'clothes',
    title: 'Blankets · 2 bags',
    donor: 'Imran S.',
    status: 'accepted',
    eta: 'ETA 40 min'
  }];
  const CONSUMER_RECEIVED = [{
    id: 'rc1',
    category: 'food',
    title: 'Packaged rice & dal',
    donor: 'Neha P.',
    time: '2 days ago'
  }, {
    id: 'rc2',
    category: 'clothes',
    title: 'School uniforms',
    donor: 'Rotary Club',
    time: '5 days ago'
  }];
  Object.assign(window, {
    PLENTY_DATA: {
      DONORS,
      CONSUMERS,
      VOLUNTEERS,
      DONATIONS,
      OPEN_REQUESTS,
      NOTIFICATIONS,
      TRANSPORT,
      ALLOCATIONS,
      CONSUMER_INCOMING,
      CONSUMER_RECEIVED
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/plenty-app/kit.jsx
try { (() => {
/* Plenty UI kit — shared layout primitives. Loaded after the bundle. */
const PUI = window.PlentyDesignSystem_a440a4;

/** Vertical page: fixed header, scrollable body, optional footer action bar and/or bottom nav. */
function Page({
  header,
  children,
  footer,
  nav,
  bg = 'var(--surface-page)',
  pad = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: bg
    }
  }, header, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad ? '16px 20px' : 0,
      paddingBottom: footer || nav ? 24 : 28
    }
  }, children)), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: '12px 20px calc(12px + env(safe-area-inset-bottom,0))',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, footer), nav);
}

/** Colored brand hero header (greeting + avatar/action), used on role home screens. */
function Hero({
  accent = 'var(--brand)',
  accent2 = 'var(--brand-strong)',
  eyebrow,
  title,
  right,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: '18px 20px 22px',
      background: `linear-gradient(150deg, ${accent} 0%, ${accent2} 100%)`,
      color: '#fff',
      borderRadius: '0 0 var(--radius-2xl) var(--radius-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      opacity: 0.82,
      letterSpacing: '0.02em'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title)), right), children);
}

/** Section heading with optional trailing action (e.g. "See all"). */
function SectionHeader({
  title,
  action,
  onAction,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      margin: '20px 0 10px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: 'var(--text-primary)',
      letterSpacing: '-0.01em'
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--brand-strong)',
      fontWeight: 700,
      fontSize: 13,
      fontFamily: 'var(--font-sans)'
    }
  }, action));
}

/** Status-bar faux for the device frame top. */
function StatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      color: c,
      fontWeight: 700,
      fontSize: 14,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 7,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'flex-end',
      gap: 1.5,
      height: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 4,
      background: c,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 6,
      background: c,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 8,
      background: c,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 11,
      background: c,
      borderRadius: 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 11,
      borderRadius: '50% 50% 0 0',
      border: `2px solid ${c}`,
      borderBottom: 'none',
      opacity: 0.95
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 11,
      border: `1.5px solid ${c}`,
      borderRadius: 3,
      padding: 1.5,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      background: c,
      borderRadius: 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1.5,
      height: 4,
      background: c,
      borderRadius: 1
    }
  }))));
}

/** Small labeled key/value used in detail screens. */
function DetailRow({
  icon,
  label,
  value,
  accent = 'var(--text-muted)'
}) {
  const Icon = (window.PlentyDesignSystem_a440a4 || {}).Icon || (() => null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-primary)',
      fontWeight: 600,
      marginTop: 1
    }
  }, value)));
}

/** Gallery photo picker — tap to choose an image file; calls onPick(dataURL). */
function PhotoPicker({
  value,
  onPick,
  shape = 'rect',
  size = 96,
  label = 'Add photo',
  accent = 'var(--brand)'
}) {
  const Icon = (window.PlentyDesignSystem_a440a4 || {}).Icon || (() => null);
  const inputRef = React.useRef(null);
  const radius = shape === 'circle' ? '50%' : 'var(--radius-md)';
  const onFile = e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onPick(r.result);
    r.readAsDataURL(f);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => inputRef.current && inputRef.current.click(),
    style: {
      width: shape === 'rect' ? '100%' : size,
      height: size,
      flex: 'none',
      cursor: 'pointer',
      padding: 0,
      overflow: 'hidden',
      borderRadius: radius,
      border: `1.5px ${value ? 'solid' : 'dashed'} ${value ? accent : 'var(--border-strong)'}`,
      background: value ? 'transparent' : 'var(--surface-sunken)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)',
      outline: 'none'
    }
  }, value ? /*#__PURE__*/React.createElement("img", {
    src: value,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "image-plus",
    size: shape === 'circle' ? 22 : 24,
    color: accent
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700
    }
  }, label)), value && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 6,
      bottom: 6,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'rgba(26,23,20,0.6)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pencil",
    size: 13,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    onChange: onFile,
    style: {
      display: 'none'
    }
  }));
}
Object.assign(window, {
  PUI,
  Page,
  Hero,
  SectionHeader,
  StatusBar,
  DetailRow,
  PhotoPicker
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/plenty-app/kit.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.ConsumerCard = __ds_scope.ConsumerCard;

__ds_ns.DonationCard = __ds_scope.DonationCard;

__ds_ns.NotificationCard = __ds_scope.NotificationCard;

__ds_ns.RequestCard = __ds_scope.RequestCard;

__ds_ns.VolunteerCard = __ds_scope.VolunteerCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Timeline = __ds_scope.Timeline;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.MapPlaceholder = __ds_scope.MapPlaceholder;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.AppBar = __ds_scope.AppBar;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
