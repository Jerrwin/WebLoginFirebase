import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging.js";

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAxgfboRUJva3ho34KI0lj0ZSudJv_mEHU",
    authDomain: "sample-ee177.firebaseapp.com",
    databaseURL: "https://sample-ee177-default-rtdb.firebaseio.com",
    projectId: "sample-ee177",
    storageBucket: "sample-ee177.appspot.com",
    messagingSenderId: "573525435729",
    appId: "1:573525435729:web:363fc88c2e6cce71259f70",
    measurementId: "G-R5MQ2PC4LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messaging = getMessaging(app);

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form from refreshing the page

    // Log to verify the form submission
    console.log("Form submitted");

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Log the username and password to verify the inputs
    console.log("Username:", username);
    console.log("Password:", password);

    // Reference to the 'users' node in Firebase
    const dbRef = ref(db, 'users/' + username);

    // Fetch data from Firebase
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.password === password) {
                alert("Login successful!");

                // Generate and store FCM token
                getToken(messaging, { vapidKey: 'BORYOGtweeFzrCa1vKt4LXYfRazJa2zclixj75h_cMhMdzBxuBvyBi9BmkIodGaKwEQ8ORL5cteBAEvQvXIh1aA' })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log("FCM Token:", currentToken);
                            // Save token to Firebase
                            set(ref(db, 'users/' + username + '/token'), currentToken)
                                .then(() => {
                                    console.log("FCM token saved successfully.");
                                })
                                .catch((error) => {
                                    console.error("Error saving token:", error);
                                });
                        } else {
                            console.log("No FCM token available.");
                        }

                        // Store token and username in localStorage
                        localStorage.setItem("userToken", currentToken);  // Store token in localStorage
                        localStorage.setItem("username", userData.username);

                        // Redirect to dashboard page
                        window.location.href = "dashboard.html";
                    })
                    .catch((error) => {
                        console.error("Error getting FCM token:", error);
                    });
            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("User not found. Please check your username.");
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
        alert("An error occurred while logging in. Please try again.");
    });
});
