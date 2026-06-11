
### WebSocket features

A persistent connection between browser and server.

1. **Bidirectional**:
   - Lets the browser and server communicate in both directions — chat apps, real-time games, stock tickers.
2. **Persistent**:
   - The connection stays open until explicitly closed by either side.
3. **Low latency**:
   - The handshake is simpler than HTTP, so connection setup is fast.
4. **Lightweight**:
   - WebSocket frames are smaller than HTTP headers.
5. **Cross-origin support**

### WebSocket long polling vs short polling?

Short polling:

- The client periodically asks the server if there's new data. If not, an empty response is returned; if yes, data is returned and the connection closes.
- **Downside**: Frequent requests/responses cause high network overhead and latency, since each request needs to open and close a connection.

Long polling:

- The client sends a request and the server doesn't respond immediately. If there's no new data, the connection stays open until data arrives or a timeout occurs.
- **Pros**: Lower request frequency than short polling — less overhead and latency.
- **Cons**: Still has latency since the client has to wait. Also, if the server has no new data for a long time, the connection times out and the client must re-request.

### Why can WebSocket be cross-origin

1. Not subject to CORS — it's based on a different protocol (`ws` or `wss`), not HTTP.
2. During the WebSocket handshake, the browser sends an `Origin` header — the server decides whether to allow cross-origin connections based on it.

### WebRTC, WebSocket, heartbeats

WebRTC is for peer-to-peer real-time communication — direct browser-to-browser connections without going through a server, enabling low-latency communication.

WebSocket is a full-duplex protocol — real-time data exchange between server and client over a single TCP connection. Used for server-to-client push: real-time chat, stock-ticker updates, etc.



To keep connections alive, you typically send heartbeats — small periodic messages that confirm the connection is still active. If no heartbeat arrives within a window, the connection is considered down and must be re-established.

### How to keep a WebSocket logged in without user awareness

**Use a Token for authentication**

Before establishing a WebSocket connection, the user authenticates via HTTP and receives a Token (e.g. JWT) containing identity info and expiration. Once the WebSocket connection is open, the client sends the Token; the server validates it before allowing the connection.

**Heartbeat**

To keep WebSocket connections alive, implement heartbeats. The client periodically sends a simple message (empty or a specific format); the server replies with an ack. If no heartbeat arrives within a window, the server considers the connection down and takes action.

**Token refresh**

Tokens typically have an expiry. To maintain login state, the client implements a refresh mechanism — when the Token is about to expire, the client transparently refreshes it via HTTP, without user awareness.

**Server-side session management**

The server maintains session management to track each WebSocket connection's state. On heartbeat, the server updates the session's last-active time. If the session is idle too long, the server can drop the connection.

**Client-side reconnection**

Even with server-side mitigations, network issues or server restarts can drop connections. The client should implement reconnection — when a drop is detected, attempt to reconnect, and on success, resend necessary info (user ID, Token) to restore the session.



### How is Token security implemented (using JWT)? Do you do route interception (e.g. block unauthenticated access to the main page)?

**Authentication and authorization**: Tokens validate identity and check whether users have permission to access resources.

**Forgery and tampering prevention**: JWTs are signed — preventing forgery and tampering, ensuring Token validity.

**Secure storage**: where you store the Token matters for security — store it securely (e.g. HTTPOnly cookies) so JavaScript can't read it.

**Expiry and refresh**: Tokens have expiry; once expired, the user must log in again, improving security. Refresh Tokens enable a smooth UX.

### DNS resolution flow

> DNS is a distributed database that translates domains into IPs on the Internet

1. **Local cache lookup**
2. **Local DNS server query** — the local DNS does recursive queries: root server → TLD server → authoritative server until it finds the IP.
   - Root server: resolves TLDs (.com, .org, .net, etc.).
   - TLD server: resolves second-level domains under the TLD (e.g. example.com).
   - Authoritative server: resolves the specific IP for the domain.
4. **Return IP**: the authoritative server returns the IP to the local DNS, which returns it to the client.
5. **Cache update**: the browser caches the IP for some time, so subsequent requests skip the lookup.

### Why TCP needs 3 handshakes? Why not 2 or 4?

1. **Why not 2?** Can't guarantee a reliable connection.
   - After the first message, the server knows the client exists, but the client doesn't know if the server received its request.
   - After the second message, the server knows the client, but the client doesn't know if the server received its request.
2. **Why 3?** Three-way handshake ensures reliable establishment.
   - 1st: client learns the server exists and tells the server to establish a connection.
   - 2nd: server learns the client exists and tells the client it can establish a connection.
   - 3rd: client confirms the server received the connection request.
3. **Why not 4 for closing?**
   - 4-way handshake works for reliable closing, but isn't necessary.
   - 3-way could close a connection, but the 4th step is needed.
4. **Why 4-way for closing?**
   - 4-way ensures reliable release.
   - 1st: initiator tells the other side to close.
   - 2nd: passive side acks the close request.
   - 3rd: initiator knows the close request was received.
   - 4th: passive side knows its close ack was received.

### How does TCP ensure reliable transmission?

1. Each packet has a `sequence number`; receiver sends acks.
2. If acks don't arrive in time, packets are `retransmitted`.
3. `Sliding window` controls send rate, avoiding receiver buffer overflow.
4. On congestion, send rate is automatically lowered.
5. Receiver recomputes the checksum and compares.
6. Three-way handshake and four-way close ensure reliable connection management.

### How to implement TCP

1. **Establish TCP socket**
   - Create TCP sockets via OS APIs.
   - Define address family, type, protocol.
2. **Connection establishment**
   - Server listens on a port for client connections.
   - Client initiates connection via three-way handshake.
3. **Data transfer**
   - Use `send()` and `recv()` for data.
   - Handle out-of-order, lost, duplicate packets — ensure reliability.
   - Implement flow and congestion control.
4. **Connection release**
   - Either side can initiate release via four-way close.
   - Release system resources — sockets, buffers.
5. **Other details**
   - Design appropriate data structures, e.g. TCP connection state machine.
   - Implement retransmit timers, sliding window.
   - Handle exceptions like RST and timeouts.
   - Optimize performance — buffer management, multithreading / async I/O.

### TCP vs UDP

- TCP is connection-oriented and reliable. UDP is connectionless and unreliable.

- TCP requires a 3-way handshake. UDP doesn't — just send datagrams.

- UDP is faster than TCP.

- TCP headers are larger with more control info. UDP headers are smaller — less overhead.

- TCP: high-reliability apps — web browsing, file transfer, email. UDP: real-time apps with lower reliability requirements — video conferencing, online gaming, streaming.

- TCP has flow and congestion control — adjusts send rate based on network. UDP has neither — send rate is decided by the app.

### Are browser TCP connections serial? Each TCP connection binds a port — what if there are 100?

**TCP connections are parallel** — each connection handles data independently; browsers can establish many in parallel.

Each TCP connection binds a **unique local port** — many can exist simultaneously; the OS dynamically assigns ports.

**Browsers limit connections per domain** — Chrome defaults to ~6 per domain.

For 100 connections, the OS assigns distinct local ports for each, allowing parallel handling.

### Common network encryption algorithms

1. **Symmetric**:
   - AES — one of the most popular today; supports 128/192/256-bit keys.
   - DES — historically common, 56-bit; now mostly deprecated.
   - 3DES — applies DES three times for stronger security.
2. **Asymmetric**:
   - RSA — based on integer factorization; widely used in HTTPS and digital signatures.
   - ECC — elliptic curve; better security and efficiency than RSA.
3. **Hashing**:
   - MD5 — historically common but now insecure; should not be used.
   - SHA-2 — current standard family, includes SHA-256, SHA-384.
   - SHA-3 — next-gen standard published in 2015.
4. **Others**:
   - Blowfish — fast symmetric algorithm; well-suited to embedded systems and hardware accelerators.
   - ChaCha20-Poly1305 — stream cipher with authentication; works well in adversarial networks.
   - SM2/SM3/SM4 — Chinese national crypto standards for domestic systems.

###  Process vs thread

1. **Definition**
   - A process is a running instance of a program.
   - A thread is an execution unit within a process; a process can have multiple threads.
2. **Resource allocation**
   - Process = unit of resource allocation
   - Thread = unit of resource usage
5. **IPC**
   - Processes typically use IPC mechanisms — pipes, semaphores, message queues.
   - Threads communicate more simply — shared memory, locks.

### IPC methods

1. **Pipes**
   - Half-duplex — data flows one direction.
   - Anonymous and named pipes.
   - Anonymous: between related processes (parent/child or siblings).
   - Named (FIFO): between any processes.
2. **Message queues**
   - Linked lists of messages stored in the kernel.
   - Enable orderly data exchange between processes.
   - Independent of sender/receiver; persist until explicitly removed.
3. **Semaphores**
   - Counters for controlling access to shared resources by multiple processes.
   - Used for mutual exclusion and synchronization.
   - Binary or integer.
4. **Shared memory**
   - Fastest IPC — multiple processes can access a shared memory region.
   - Needs synchronization (e.g. semaphores) to coordinate access.
5. **Sockets**
   - Special files providing IPC (or network) communication.
   - Used for processes on the same host (Unix Domain Socket) or across hosts.
6. **Message passing**
   - Higher-level IPC via sending/receiving messages.
   - Synchronous or asynchronous; both sides exchange info in agreed format.

### How to avoid memory fragmentation

1. **Aligned allocation**
   - Allocate aligned memory blocks (4/8/16-byte aligned) to reduce fragmentation.
   - OS-provided allocators (malloc, calloc) typically do alignment.
2. **Memory pools**
   - Pre-allocate a large block as a pool; allocate small blocks from it.
   - Reduces fragmentation and improves allocation efficiency.
3. **Buddy system**
   - Dynamic allocation algorithm that manages memory blocks efficiently with low fragmentation.
   - Used by OS kernels for memory management.
4. **Use efficient data structures**
   - Prefer contiguous memory (arrays over linked lists).
   - For dynamic allocations, use memory pools or pre-allocate.
5. **Periodically compact**
   - Periodically compact allocated blocks to reduce fragmentation.
   - Some OSes auto-defrag (e.g. Windows defrag).
6. **Variable-length allocation**
   - Use variable allocations (e.g. `realloc()`) for adaptive sizing.
   - Reduces waste and fragmentation.
7. **Specialized memory libraries**
   - jemalloc, tcmalloc — better memory management with less fragmentation.
   - Use more sophisticated allocation algorithms.

### What is dual-token authentication

A stronger authentication scheme

1. Step 1: validate username + password
2. Step 2: provide a second verification code

### How long should tokens last? RefreshToken duration?

1. **Access Token lifetime**
   - Usually short — 15 min to 2 hours.
   - Short lifetime reduces theft risk.
2. **Refresh Token lifetime**
   - Usually longer — days to months.
   - Avoids forcing the user to log in frequently.

A typical setup:

- Access Token: 1 hour
- Refresh Token: 7 days


On login, the server issues both an Access Token and a Refresh Token.

The client uses the Access Token to access protected resources; when it expires, the client uses the Refresh Token to request a new Access Token without re-login.

The Refresh Token also expires eventually — then the user must log in again.

Reasons for long Refresh Token lifetimes:

1. Avoid frequent re-logins — better UX.
2. Refresh Tokens need lifetime too — to prevent abuse.

### Other ways to preserve login state? Can it be done without the backend?

1. **Cookie + Session**
   - On login, server generates a Session ID stored server-side and sets it as a Cookie on the client.
   - Subsequent client requests carry the Cookie; the server validates the Session ID.
2. **localStorage and sessionStorage**
   - On login, the frontend stores login info in localStorage or sessionStorage.
   - On refresh or reopen, the frontend reads login state from Web Storage — no backend needed.
   - Works well for SPAs with independent frontends.
3. **JWT (JSON Web Tokens)**
   - On login, the server issues a JWT containing user info in the payload.
   - The client stores it in localStorage or a Cookie and attaches it on every request.
   - The server verifies the JWT signature without server-side session lookups.
   - Suitable for separated frontend/backend; frontend can preserve login independently.
4. **Credential Management API**
   - HTML5's Credential Management API lets the browser manage user credentials.
   - On login, the frontend stores credentials in the browser's credential store.
   - On refresh or reopen, the browser auto-fills login info — no re-entry needed.
   - Great UX, but requires browser support.

### Can Session work across domains?

By default, Sessions can't span domains because cookies are restricted by the browser. Cross-domain Sessions require `SameSite=None` and HTTPS.

### **Can Cookies be shared across domains?**

- **Default**: Cookies are bound to their domain — not cross-domain.
- **Solutions**:
   - **Single Sign-On (SSO)**: unified auth center to share across domains.
   - **JWT**: store user info on the client and pass via request headers.

### Where to store tokens? Downsides of localStorage?

1. In a Cookie, so it's auto-sent on subsequent requests.
2. In LocalStorage, so it persists after the browser closes.
3. In SessionStorage, valid only during the current session.
4. Server-side DB: tokens can also be stored on the server for better security and control — requires server logic.



Storing tokens in LocalStorage has potential issues:

1. Security: LocalStorage data can be accessed by other scripts on the page.
2. Data leakage: if the user's device is infected, malware could read LocalStorage — including the token.
3. Cross-origin: LocalStorage data is only shared between pages of the same origin; if the page needs to talk to other origins, the token may not be transferable.

To mitigate:

1. Encrypt the token — even if stolen, attackers can't decrypt and use it.
2. Set expiration — auto-clear the token after a window to reduce leakage risk.
3. Use HTTPS — prevent data theft in transit.
4. Don't store sensitive info in LocalStorage (e.g. passwords).

### Browser storage

1. **Cookie**
   - Characteristics:
     - Small amount of data (~4KB)
     - Auto-sent with every HTTP request
     - Has expiration; cleared when the browser closes
   - Use cases:
     - Session management (login state, cart)
     - Personalization
     - Tracking
2. **Web Storage**
   - Two flavors:
     - **localStorage**: persistent until manually cleared
     - **sessionStorage**: temporary; cleared at session end (when browser closes)
   - Characteristics:
     - Larger data capacity (~5MB)
     - Only on the client; not sent with requests
     - Richer API
   - Use cases:
     - Offline app cache
     - Personal settings
     - Temp data
3. **IndexedDB**
   - Characteristics:
     - Large structured data (no inherent limit)
     - Transactions for data integrity
     - Indexes for efficient queries
   - Use cases:
     - Offline web apps
     - Large data storage
     - Complex relational data
4. **File API**
   - Characteristics:
     - JS can directly access and operate local files
     - Upload / download
     - Read file contents
   - Use cases:
     - File upload/download
     - Image previews
     - Drag-and-drop

### HTTP caching

1. **Strong cache**:
   - Controlled via `Cache-Control` and `Expires` headers.
   - `Cache-Control: max-age=3600` — usable from cache for 3600 seconds.
   - `Expires: Fri, 31 Dec 2024 23:59:59 GMT` — cache valid until the specified time.
2. **Negotiated cache**:
   - Via `Last-Modified` / `If-Modified-Since` or `ETag` / `If-None-Match`.
   - `Last-Modified` — last modification time; `If-Modified-Since` asks if updated.
   - `ETag` — unique resource identifier; `If-None-Match` asks if it changed.
3. **Browser cache**:
   - Browser auto-manages cache based on `Cache-Control` and friends.
   - Manual cache clear invalidates it.
4. **CDN cache**:
   - CDN nodes cache static assets, reducing origin load.
   - CDN cache usually takes precedence over browser cache.
5. **Service Worker cache**:
   - Service Worker can fully control caching and updates.
   - Enables offline access for better UX.

### When does strong cache become invalid?

Possible cases:

- The resource expires (`Expires` or `Cache-Control` expired).
- The user manually clears the browser cache.
- The resource URL changes.

### Parts of an HTTP request

1. Request method — what to do on the server (GET, POST, PUT, DELETE).
2. Request headers — extra info about the request (client type, language, accepted types). Key-value pairs.
3. Request body — for some methods (POST, PUT) the body can contain data. Content types include form data, JSON, XML.



**GET requests typically don't carry a body.**

### Parts of a Cookie

1. Name
2. Value
3. Expiry (via `expires`)
4. Path (via `path`)
5. Domain (via `domain`)

### Cookies and tokens both sit in headers — why is the former hijacked but not the latter?

1. Cookie visibility: cookie content is visible in browser DevTools, easier for attackers to see.
2. Token design: tokens are typically encrypted or signed and contain specific info (identity, permissions). Cookies are just key-value pairs — easier to guess or crack.

### Cookie vs Session

**Storage location**

- Cookie — stored on the client browser.
- Session — stored on the server side.

**Security**

- Cookie — on the client, easier to steal or tamper.
- Session — on the server, relatively safer.

**Size**

- Cookies are limited (~4KB).
- Sessions can store much more.

**Client interaction**

- Cookies are auto-sent with every HTTP request.
- Sessions pass a Session ID between client and server.

**Cross-domain**

- Cookies are constrained by same-origin policy — not cross-domain.
- Sessions can share across domains using the Session ID.

### How does Cookie get auto-sent on every request?

1. Server sets the cookie via `Set-Cookie` in the response header.
2. Browser stores it locally — typically in the cookie database.
3. On subsequent requests to the same domain, browser adds the cookie to the `Cookie` header.
4. Server reads the cookie info from the request header.

### Issues with Cookie auto-sending

1. Privacy — sensitive info may be stolen, leading to leakage.
2. CSRF — Cross-Site Request Forgery.
3. Bandwidth — auto-attached cookies increase request size.
4. Storage limits — auto-sent with lots of data may exceed limits, causing cookies to be dropped or stored incorrectly.
5. Compatibility — different browsers handle cookies differently.



To mitigate:

1. Encrypt and sign cookies.
2. Limit cookie scope to reduce CSRF risk.
3. Set appropriate expiry.
4. Optimize cookie size.

### HTTP/1.1 keep-alive

> Allows multiple HTTP requests/responses over a single TCP connection

### HTTP/1.1 keep-alive vs HTTP/2 multiplexing

1. **Connection management**:
   - Keep-Alive — HTTP/1.1 uses specific headers to enable Keep-Alive. Multiple requests/responses on the same TCP connection avoid frequent setup/teardown — better perf.
   - Multiplexing — HTTP/2 uses multiplexing: multiple requests/responses on the same TCP connection without ordering constraints. Each request/response gets a stream identifier; the server uses it to route.

2. **Request concurrency**:
   - Keep-Alive — even with reuse, requests are processed serially.
   - Multiplexing — HTTP/2 enables concurrent requests processed in parallel on the server.

3. **Header compression**:
   - Keep-Alive — HTTP/1.1 has no header compression; headers can be large.
   - Multiplexing — HTTP/2 introduces header compression to reduce overhead.



### HTTP/2 vs HTTP/1.1; understanding HTTP/3

**Main differences between HTTP/2 and HTTP/1.1:**

1. **Transport format**:
   - 1: plaintext  2: binary
2. **Multiplexing**:
   - 1: one request per TCP connection  2: multiplexed — multiple requests in parallel on one TCP connection
3. **Header compression**:
   - 1: no header compression  2: HPACK compression



HTTP/3 is the next-gen HTTP based on QUIC. Improvements over HTTP/2:

1. **Transport**:
   - 2: TCP — has limitations  3: UDP-based QUIC
2. **Connection establishment**:
   - 2: TCP 3-way handshake  3: QUIC's faster establishment
3. **Flow control**:
   - 2: relies on TCP flow control  3: QUIC has more flexible flow control
4. **Security**:
   - 2: relies on TLS  3: TLS integrated directly into QUIC

### Why is HTTPS secure? Symmetric or asymmetric encryption?

1. Uses session keys — even if a key is broken, only the current session is affected.
2. SSL/TLS encrypts content; digital certificates verify identity.
3. Detects tampering during transmission.





`Handshake phase`: exchange symmetric key via asymmetric encryption. `Data transfer phase`: use symmetric key for encrypt/decrypt.

### HTTP status codes

- **100-199 (informational)**:
   - 100 Continue — client should continue the request.
   - 101 Switching Protocols — server switching protocols per request.
- **200-299 (success)**:
   - 200 OK
   - 201 Created — request succeeded and a new resource was created.
   - 204 No Content — succeeded; no body.
- **300-399 (redirection)**:
   - 301 Moved Permanently — resource permanently relocated.
   - 302 Found — resource temporarily relocated. Includes a `Location` header.
   - 304 Not Modified — client's cached resource is unchanged.
- **400-499 (client error)**:
   - 400 Bad Request — invalid syntax.
   - 401 Unauthorized — auth required.
   - 403 Forbidden — server refuses the request.
   - 404 Not Found.
- **500-599 (server error)**:
   - 500 Internal Server Error.
   - 501 Not Implemented.
   - 503 Service Unavailable.

### What does a 304 mean? Types of caching.

> The requested resource hasn't changed on the server

Benefits:

- Reduce unnecessary data transfer; speed up page load.
- When the resource hasn't changed, use the cached copy — no re-download.



- **Browser cache**
- **Proxy server cache**
- **CDN cache**
- **Server-side cache**

### HTTP vs HTTPS

1. **Security**:
   - **HTTP**: plaintext; vulnerable to MITM attacks; data may be stolen or tampered with.
   - **HTTPS**: encrypted via SSL/TLS; authenticates the server; prevents MITM; improves data security.
2. **Ports**:
   - **HTTP**: 80
   - **HTTPS**: 443
3. **Certificates**:
   - **HTTP**: no cert needed.
   - **HTTPS**: CA digital certificate verifies server identity.
4. **Performance**:
   - **HTTP**: no encrypt/decrypt overhead; faster than HTTPS.
5. **Use cases**:
   - **HTTP**: non-sensitive data — static pages, images.
   - **HTTPS**: scenarios protecting privacy — e-commerce, payments, login auth.

### What is the same-origin policy? Do server-to-server requests trigger CORS?

> A browser security mechanism — only allows access to resources from the same origin (protocol + domain + port).
>
> **Purpose**: prevent XSS and other cross-origin attacks.

### **Browsers enforce same-origin policy — why don't CDN requests trigger CORS?**

- **Reason**:
   - CDN resources are usually loaded via `<script>`, `<link>`, `<img>` — not subject to same-origin policy.
   - If you request CDN resources via `fetch` or `XMLHttpRequest`, CORS headers are required on the CDN server.

### How to solve cross-origin issues?

1. **CORS** — an HTTP-header-based mechanism letting servers specify which origins may access which resources.

   - `Access-Control-Allow-Origin`: allowed origins; can be a specific domain or `*`.
   - `Access-Control-Allow-Methods`: allowed cross-origin methods (e.g. GET, POST, PUT).
   - `Access-Control-Allow-Headers`: allowed request headers.

2. **JSONP**:

   1. Create a `<script>` tag and set `src` to a backend URL.
   2. Append a `callback` parameter naming a callback function `handleResponse`.
   3. Inserting the `<script>` triggers a cross-origin request.
   5. `handleResponse` receives the server data and prints to the console.

3. **Nginx reverse proxy**: configure Nginx to proxy cross-origin requests to the target server.

   ```json
   # Nginx config
   events {
       worker_connections 1024;
   }

   http {
       server {
           listen 80;
           server_name example.com;

           location / {
               proxy_pass http://backend_servers;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           }
       }

       upstream backend_servers {
           server 192.168.1.100:8080;
           server 192.168.1.101:8080;
       }
   }
   ```

4. **postMessage()** — HTML5 cross-document messaging for cross-window communication.

   **Use cases:**

    1. **Cross-origin communication**: pass data with iframes, popups, or other tabs from different origins.
    2. **Messaging**: pass messages between windows/tabs without direct DOM access.
    3. **Secure communication**: secure communication with windows opened by `window.open()`.

5. **WebSocket**: bidirectional protocol for true cross-origin real-time communication.

   **Features**

    1. Either side can send/receive data at any time — no need to wait for a response.
    2. Connection stays open once established.
    3. No frequent new TCP connections — lower latency.
    4. Supports text and binary data.

   **Use cases**
   Real-time chat, gaming, push, collaborative editing, IoT.

6. webpack with webpack-dev-server's proxy option.

7. node with express + http-proxy-middleware: `app.use('./', proxy({}))`.

### CSRF and XSS

XSS — inject malicious Script code.

Defense: 1. `Content-Security-Policy: default-src 'self';` 2. HTML-escape output data.



CSRF — attacker uses the victim's cookie to trick the server's trust.

### JSONP response format, CORS frontend/backend setup

```js
// JSONP is a JavaScript function call
<script>
function handleResponse(data) {
  console.log(data);
}
</script>
<script src="https://example.com/data?callback=handleResponse"></script>


// CORS
fetch: mode: 'cors'
express: use(cors())
```

### CSRF, XSS, SQL injection, DDoS — differences

CSRF, XSS, SQL injection, and DDoS are four common attacks with different methods and goals.

### CSRF (Cross-Site Request Forgery)

CSRF uses the victim's identity for unauthorized operations. The attacker tricks the user into visiting a malicious site or clicking a link; using the victim's session (e.g. cookies) on the target site, the attacker performs unauthorized actions — modifying info, transferring money, etc.

**Defense**:
- Use CAPTCHAs.
- Check HTTP Referer.
- Use CSRF tokens.

### XSS (Cross-Site Scripting)

XSS injects malicious script into web pages; when other users browse, the script runs in their browser — stealing data, tampering with content, etc.

**Defense**:
- Strictly filter and escape user input.
- Use Content Security Policy (CSP) to restrict script execution.

### SQL injection

SQL injection inserts malicious SQL into form inputs or URL queries. When the server processes the input via SQL queries, attackers can execute arbitrary SQL and access sensitive data.

**Defense**:
- Parameterized queries or prepared statements.
- Strict validation and sanitization of input.
- Database privilege minimization.

### DDoS (Distributed Denial of Service)

DDoS attacks flood servers or networks with traffic to deny service. Attackers typically control many compromised machines (botnets) to overwhelm the target.

**Defense**:
- Use DDoS protection services.
- Limit per-IP connections and request rates.
- Scale bandwidth and processing capacity.

In summary: CSRF abuses user identity for unauthorized actions, XSS executes malicious scripts in browsers, SQL injection attacks databases via crafted SQL, and DDoS denies service via traffic. Each requires specific defenses — apply appropriate security measures during dev and deployment.

### What does the `Set-Cookie: http-only` header do?

- Prevents client-side scripts from accessing the cookie; server can still read and modify.
- Helps prevent XSS exploitation.

### Where is HTTPS weakest?

Certificate issues — if the attacker obtains a valid CA's private key, they can forge SSL certificates for any site.

Protocol vulnerabilities

**Heartbleed** — a severe OpenSSL bug that lets attackers steal sensitive data from server memory.

User behavior — if users trust a forged certificate, they may unknowingly conduct insecure communications.

Man-in-the-Middle (MITM)

> The attacker inserts themselves between two parties to steal or tamper with data. Defenses include HTTPS and cert validation.

- **Public Wi-Fi attacks**
- **DNS spoofing** — redirect users to malicious sites.



To improve HTTPS security:

- Keep server software updated; no known vulns.
- Use strong crypto and secure protocols — TLS 1.2 or TLS 1.3.
- Ensure server SSL certs are valid and signed by trusted CAs.
- Use HSTS to enforce HTTPS access.



### HTTP simple vs complex (preflighted) requests

Simple request:

1. Method is GET, HEAD, or POST.
2. If POST, `Content-Type` must be one of:
    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`
3. No custom headers (other than Accept, Accept-Language, Content-Language, Content-Type).

The browser sends the request directly without a preflight. The server's response headers determine whether the cross-origin request is allowed.



Complex request:

Requests using PUT or DELETE, custom headers, non-standard Content-Type POSTs.

The browser sends a `preflight (OPTIONS) request` first, asking whether the cross-origin request is allowed.

The preflight includes `Access-Control-Request-Method` (the actual method) and `Access-Control-Request-Headers` (custom headers).



The server must respond to the preflight,

specifying allowed methods via `Access-Control-Allow-Methods`,

allowed headers via `Access-Control-Allow-Headers`. If allowed,

the response should also include `Access-Control-Allow-Origin` set to the allowed origin.





### JWT questions:

◦ What is JWT made of? **Header** + **Payload** (claims about the subject and other data) + **Signature**

◦ What problem does JWT solve? Lets the server verify user identity without storing session data.

◦ Advantages over session+cookie?

1. **Stateless**: JWT requires no server-side session storage.
2. **Scalable**: easily shared across servers.
3. **Easy to use**: easily transported via HTTP headers between client and server.

### TCP/IP 5-layer model — purpose of each layer

**Application layer** — the user-to-network interface, e.g. web browsing, file transfer, email, DNS, formatting, encryption, compression.

**Transport layer** — end-to-end data transfer. Ensures ordered, error-free delivery; provides flow and congestion control. Main protocols: TCP, UDP.

**Network layer** — moves `packets` from source to destination host.

**Data-link layer** — transfer data between adjacent network nodes. Handles physical addresses (MAC).

**Physical layer** — transfer raw bits over physical media (twisted pair, fiber, wireless).



### TCP head-of-line blocking

TCP HOL blocking: when an early packet is lost, subsequent packets can't be processed, causing latency. TCP must wait for the lost packet to be retransmitted and acknowledged before processing subsequent ones.

### What if you don't want a page to be Keep-Alive cached?

`Keep-Alive` lets the client and server reuse a TCP connection rather than closing it after each request.



### The 7-layer model (OSI)

1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

For frequently changing resources, set short cache times or use `no-cache` to ensure users always get the latest content.
