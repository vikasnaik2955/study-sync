# Running StudySync — step by step

This guide takes you from a fresh clone to the app running in your browser. It assumes **Windows**
(PowerShell), but the commands are noted for macOS/Linux too. If anything fails, jump to
[Troubleshooting](#troubleshooting) at the bottom.

There are three pieces, started in this order:

1. **MySQL** (the database)
2. **Backend** — Spring Boot API on `http://localhost:8080`
3. **Frontend** — React app on `http://localhost:5173`

Keep each running in its **own terminal window**.

---

## 0. Prerequisites (check once)

Open PowerShell and verify each tool. Versions shown are minimums.

```powershell
java -version      # need 17.x   (you have 17 ✓)
node -v            # need 18+    (you have 22 ✓)
npm -v
```

You do **not** need Maven installed globally — the backend ships a wrapper (`mvnw`). You do need
a MySQL 8 server; pick **one** of the two options in Step 1.

If `java -version` shows something older than 17, install **JDK 17** (Eclipse Temurin 17 from
adoptium.net) and reopen the terminal.

---

## 1. Start MySQL

The backend connects as **root / root** and **creates the `studysync` database for you** on first
run — so you don't have to create any tables or schema by hand. You only need a MySQL server running.

### Option A — Docker (simplest, if you have Docker Desktop)

From the project root:

```powershell
docker compose up -d
```

That's it — it starts MySQL 8 on port 3306 with root password `root`. Check it's up:

```powershell
docker ps
```

To stop it later: `docker compose down` (add `-v` to also delete the data).

### Option B — No Docker (use your local MySQL)

Since you already work with MySQL, this is likely the easiest path:

1. Make sure your **MySQL 8** server is running (MySQL installed as a Windows service starts
   automatically; XAMPP users start it from the XAMPP control panel).
2. That's all the DB setup you need — the app creates the `studysync` schema itself.
3. **Match the credentials.** The app defaults to user `root`, password `root`. If your root
   password is different (or empty), tell the backend when you start it — see the **Step 2.1** note
   just below. You do *not* need to create a database or user manually.

> Prefer a dedicated user instead of root? Create one and grant it rights, then pass its
> credentials via `DB_USER`/`DB_PASS` (Step 2.1):
> ```sql
> CREATE USER 'studysync'@'localhost' IDENTIFIED BY 'studysync';
> GRANT ALL PRIVILEGES ON studysync.* TO 'studysync'@'localhost';
> CREATE DATABASE IF NOT EXISTS studysync;
> ```

---

## 2. Start the backend (API)

Open a **new** terminal in the `backend` folder.

```powershell
cd "D:\Project\Android app\Study App\backend"
.\mvnw.cmd spring-boot:run
```

- macOS/Linux: `./mvnw spring-boot:run`
- The **first** run downloads Maven + dependencies — this can take a few minutes. Later runs are fast.
- On startup, Hibernate creates all the tables and a seeder inserts default subjects automatically.

You'll know it's ready when you see a line like `Started StudySyncApplication in X seconds`.

**Verify it's working** — open these in a browser:

- API docs (try endpoints right here): http://localhost:8080/swagger-ui.html
- Subjects are seeded, so the app has data to work with immediately.

> **2.1 — Custom database credentials.** If your MySQL root password isn't `root` (or you made a
> dedicated user), start the backend like this instead (PowerShell). Most people only need to change
> `DB_PASS`:
> ```powershell
> $env:DB_PASS="your_mysql_password"; .\mvnw.cmd spring-boot:run
> ```
> Full override (different user/host/db):
> ```powershell
> $env:DB_URL="jdbc:mysql://localhost:3306/studysync?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"; $env:DB_USER="studysync"; $env:DB_PASS="studysync"; .\mvnw.cmd spring-boot:run
> ```

### Alternative: run the backend from IntelliJ

You have IntelliJ IDEA installed, which is the easiest path:

1. **File → Open** and select the `backend` folder (it detects the Maven project and downloads
   dependencies).
2. Open `src/main/java/com/studysync/StudySyncApplication.java`.
3. Click the green ▶ next to `main(...)` → **Run 'StudySyncApplication'**.

(Postgres from Step 1 still needs to be running.)

---

## 3. Start the frontend (web app)

Open a **third** terminal in the `frontend` folder.

```powershell
cd "D:\Project\Android app\Study App\frontend"
copy .env.example .env       # first time only  (macOS/Linux: cp .env.example .env)
npm install                  # first time only — downloads packages
npm run dev
```

When it prints `Local: http://localhost:5173/`, open that URL.

The dev server proxies `/api` and `/ws` to the backend on port 8080, so you don't have to configure
anything else.

---

## 4. Use the app

1. Click **Create an account**, register with any email + an 8-character password.
2. You're dropped into the **Notes** library. From the top nav you can reach **Groups**, **Q&A**,
   **Chat**, **Rooms**, and your **Profile**.
3. Quick tour to confirm everything works:
   - **Notes** → *Upload notes* (pick a subject + a PDF/DOC/PPT), then download it back.
   - **Groups** → *Create group*, open it, post in the discussion.
   - **Q&A** → *Ask a question*, answer it, upvote.
   - **Rooms** → *Open a room*, type in the live discussion (open a second browser/incognito
     window, log in as another user, and join to see real-time updates).
   - **Chat** → open a group's chat or message a group member.

To test **real-time** features properly, use two browsers (or one normal + one incognito) signed in
as two different accounts.

---

## Stopping everything

- Backend / frontend: press **Ctrl+C** in their terminals.
- Docker Postgres: `docker compose down` (keeps data) or `docker compose down -v` (wipes data).

---

## Daily routine (after first-time setup)

Three terminals:

```powershell
# 1. database (Docker) — or just make sure your local MySQL service is running
docker compose up -d

# 2. backend
cd "D:\Project\Android app\Study App\backend"; .\mvnw.cmd spring-boot:run

# 3. frontend
cd "D:\Project\Android app\Study App\frontend"; npm run dev
```

---

## Troubleshooting

**Backend: `Communications link failure` / `Connection refused` (port 3306)**
MySQL isn't running. Recheck Step 1 — `docker ps` should list the db container, or your local MySQL
service / XAMPP MySQL should be started.

**Backend: `Access denied for user 'root'@'localhost'`**
The DB password doesn't match. Pass your real MySQL password via `DB_PASS` (see Step 2.1):
`$env:DB_PASS="your_mysql_password"; .\mvnw.cmd spring-boot:run`.

**Backend: `Public Key Retrieval is not allowed` or an SSL error**
The default `DB_URL` already includes `allowPublicKeyRetrieval=true&useSSL=false` for local MySQL 8.
If you overrode `DB_URL`, keep those parameters.

**Backend: `Port 8080 was already in use`**
Something else is on 8080. Stop it, or run on another port:
`$env:SERVER_PORT="8081"; .\mvnw.cmd spring-boot:run` — but then also update the frontend proxy
target in `frontend/vite.config.js` to `http://localhost:8081`.

**Want a clean database (wipe dev data and let it rebuild)?**
- Docker: `docker compose down -v` then `docker compose up -d`.
- Local MySQL: `DROP DATABASE studysync;` — the backend recreates it on the next start.

**Frontend: `npm install` fails or `vite: command not found`**
Delete `node_modules` and the lockfile, then reinstall:
`Remove-Item -Recurse -Force node_modules; npm install`.

**Frontend loads but every request fails / login does nothing**
The backend isn't running, or isn't on port 8080. Confirm http://localhost:8080/swagger-ui.html
opens. Make sure you created `frontend/.env` from `.env.example`.

**Uploads fail with "File type not allowed"**
Only PDF, DOC/DOCX, PPT/PPTX are accepted, up to 25 MB. That's by design.

**`.\mvnw.cmd` is blocked / "running scripts is disabled"**
That's PowerShell's execution policy. Run the wrapper via `cmd` instead:
`cmd /c mvnw.cmd spring-boot:run`, or run the backend from IntelliJ (Step 2 alternative).

**Real-time (chat/rooms) doesn't update live**
WebSockets go through `/ws`. Make sure the backend is running and you reached the app via
`http://localhost:5173` (not by opening the built files directly). Two different signed-in users are
needed to see messages move between windows.

---

For the full architecture, API reference, configuration options, and deployment notes, see
[`README.md`](README.md).
