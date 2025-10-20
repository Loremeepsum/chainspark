// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGo4RbGJnL5oB3kUVTDWVtnhMURs_KLT4",
    authDomain: "chainspark-e95ed.firebaseapp.com",
    projectId: "chainspark-e95ed",
    storageBucket: "chainspark-e95ed.firebasestorage.app",
    messagingSenderId: "404202716131",
    appId: "1:404202716131:web:6807c2e74f97ea203bfed6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");

// Get form elements
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        // Add user to Firestore
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            role: email.toLowerCase() === 'admin@chainspark.com' ? 'admin' : 'user',
            joinedAt: serverTimestamp()
        });
        
        console.log("User created with ID:", docRef.id);
        
        // Save user info to localStorage so the main app knows they're logged in
        const userData = {
            id: docRef.id,
            name: name,
            email: email,
            role: email.toLowerCase() === 'admin@chainspark.com' ? 'admin' : 'user',
            joinedAt: Date.now()
        };
        localStorage.setItem('chainspark_currentUser', JSON.stringify(userData));
        
        // Show success message
        messageDiv.textContent = `✅ Welcome, ${name}! Redirecting...`;
        messageDiv.className = 'message success';
        messageDiv.style.display = 'block';
        
        // Clear form
        loginForm.reset();
        
        // Redirect to main app after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        console.error("Error adding user:", error);
        
        // Show error message
        messageDiv.textContent = `❌ Error: ${error.message}`;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
    }
});