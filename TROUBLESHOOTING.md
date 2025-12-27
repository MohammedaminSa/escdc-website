# 🚨 ESCDC Website Troubleshooting Guide

## 🔥 **Quick Fix (90% of problems)**

**Just run this:**
```bash
fix-and-start.bat
```

## 🛠️ **Manual Steps (if script doesn't work)**

### **Problem: Only Events page loads data**

**Step 1: Kill all Node processes**
```bash
taskkill /F /IM node.exe
```

**Step 2: Wait 3 seconds, then start**
```bash
npm run dev
```

**Step 3: Check both servers are running**
- Backend: http://localhost:5002 (should show "ESCDC API is running")
- Frontend: http://localhost:5173 or 5174

---

## 🔍 **Detailed Diagnosis**

### **Check if servers are running:**
```bash
# Check backend
curl http://localhost:5002/api/health

# Check what ports are in use
netstat -ano | findstr :5002
netstat -ano | findstr :5173
```

### **If backend won't start (EADDRINUSE error):**
```bash
# Find what's using port 5002
netstat -ano | findstr :5002

# Kill specific process (replace XXXX with PID number)
taskkill /PID XXXX /F
```

### **If frontend can't connect to backend:**
1. Check browser console (F12) for errors
2. Make sure backend shows "MongoDB Connected" message
3. Verify frontend is calling correct API URL

---

## 🎯 **Common Issues & Solutions**

### **Issue 1: Port 5002 already in use**
**Solution:**
```bash
taskkill /F /IM node.exe
# Wait 3 seconds
npm run dev
```

### **Issue 2: Frontend on wrong port**
- If frontend runs on 5174, update `backend/.env`:
  ```
  FRONTEND_URL=http://localhost:5174
  ```
- If frontend runs on 5173, update `backend/.env`:
  ```
  FRONTEND_URL=http://localhost:5173
  ```
- Then restart backend: `cd backend && npm start`

### **Issue 3: MongoDB connection failed**
- Check your internet connection
- Verify MongoDB Atlas credentials in `backend/.env`
- Make sure your IP is whitelisted in MongoDB Atlas

### **Issue 4: Pages show "Failed to fetch"**
1. Check if backend is running: http://localhost:5002/api/health
2. Check browser console for CORS errors
3. Make sure FRONTEND_URL in backend/.env matches your frontend port

---

## 📱 **Emergency Commands**

**Nuclear option (kills everything):**
```bash
taskkill /F /IM node.exe
taskkill /F /IM cmd.exe
# Then restart everything
```

**Check if APIs are working:**
```bash
curl http://localhost:5002/api/gallery
curl http://localhost:5002/api/leadership
curl http://localhost:5002/api/resources
curl http://localhost:5002/api/events
```

---

## 🚀 **Perfect Startup Routine**

1. **Close all terminals/IDE**
2. **Open new terminal in project folder**
3. **Run:** `fix-and-start.bat`
4. **Wait for both servers to start**
5. **Visit:** http://localhost:5173 or 5174
6. **Done!** ✅

---

## 📞 **Still Having Issues?**

1. Check that both servers show "running" status
2. Test API endpoints with curl commands above
3. Check browser console (F12) for JavaScript errors
4. Verify MongoDB connection in backend terminal

**Most problems are solved by killing Node processes and restarting!**