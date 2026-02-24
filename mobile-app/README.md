# 📱 Cyberyan Mobile App (Frontend)

This is the React Native (Expo) frontend for the Cyberyan VC/DID mock task.

## 🛠 Tech Stack

- Expo (Managed Workflow)
- React Native
- TypeScript
- Redux Toolkit
- Expo Router
- Axios
- NativeWind

---

## 🚀 Installation & Run


### 1. Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start Development Server

```bash
npx expo start
```

---

### 4️⃣ Run the App

- Press `i` → Run on iOS simulator  
- Press `a` → Run on Android emulator  
- Or scan the QR code using **Expo Go**

---

## ⚙️ Backend Requirement

Make sure the backend server is running before using the app.

Update API base URL in:

```
services/api.ts
```

Example:

```ts
baseURL: "http://192.168.1.3:8000/api"
```

⚠ Do not use `localhost` when testing on a physical device.

---

## 📌 App Flow

1. Register user (name, email, upload images)
2. Backend returns DID and Verifiable Credential (VC)
3. Wallet screen displays DID and VC fields
4. Audit screen shows SHA-256 issuance hash

---

## 📄 Notes

- Image upload is preview-only (mock)
- JWT authentication handled by backend mock endpoint
- Backend uses Faker.js for mock data generation
