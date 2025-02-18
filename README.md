# 📚 Book Review Platform

## 🎯 Objective
Develop a **Book Review Platform** where users can browse books, read and write reviews, and rate books. This application is built with a **React frontend** and a **Node.js backend** using **Express** and **MongoDB**.

## 🚀 Features

### 🔹 Frontend (React)
- **Responsive UI** with the following pages:
  - Home page with featured books
  - Book listing page with search and filter functionality
  - Individual book page with details and reviews
  - User profile page
  - Review submission form
- **State management** using Redux or React Context API
- **React Router** for navigation
- **Error handling & loading states**
- **Integration with the backend API**

### 🔹 Backend (Node.js, Express, MongoDB)
- **RESTful API Endpoints**:
  - `GET /books` - Retrieve all books (with pagination)
  - `GET /books/:id` - Retrieve a specific book
  - `POST /books` - Add a new book (admin only)
  - `GET /reviews` - Retrieve reviews for a book
  - `POST /reviews` - Submit a new review
  - `GET /users/:id` - Retrieve user profile
  - `PUT /users/:id` - Update user profile
- **Data validation and error handling**
- **MongoDB for data persistence**

---

## 🛠️ Installation & Setup

### 🔹 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🔹 Clone the Repository
```sh
git clone https://github.com/yourusername/book-review-platform.git
cd book-review-platform
```

### 🔹 Backend Setup
```sh
cd backend
npm install
npm start
```
Create a `.env` file in the `backend` directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 🔹 Frontend Setup
```sh
cd frontend
npm install
npm start
```
Create a `.env` file in the `frontend` directory and add:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🔄 API Endpoints
| Method | Endpoint          | Description             |
|--------|------------------|-------------------------|
| GET    | /books           | Retrieve all books      |
| GET    | /books/:id       | Retrieve a book by ID   |
| POST   | /books           | Add a new book (Admin)  |
| GET    | /reviews         | Get book reviews        |
| POST   | /reviews         | Add a review            |
| GET    | /users/:id       | Get user profile        |
| PUT    | /users/:id       | Update user profile     |

---

## 🎨 UI/UX Features
- **Modern and clean design**
- **Responsive layout for mobile and desktop**
- **Loading states & error handling**
- **User authentication (optional)**

---

## ✅ Evaluation Criteria
- **Code quality & organization**
- **Proper use of React hooks & components**
- **RESTful API design & implementation**
- **Database schema design**
- **Error handling & edge case management**
- **Documentation clarity**
- **UI/UX design considerations**

---

## 🔗 Deployment (Optional)
If you want to deploy the project:
- **Frontend**: Deploy on **Vercel** or **Netlify**
- **Backend**: Deploy on **Render** or **Heroku**
- **Database**: Use **MongoDB Atlas** for cloud storage

---

## 📝 Notes
- The "Add Book" button now **prevents multiple clicks** by adding a **loading animation**.
- Implemented state management to disable the button until the request is complete.

```jsx
<Button variant="primary" type="submit" className="w-100 custom-btn" disabled={loading}>
    {loading ? (
        <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Adding...
        </>
    ) : (
        "Add Book"
    )}
</Button>
```

---

## 📌 Submission
- **GitHub Repository:** Provide a link to the full project repo.
- **Live Demo (if deployed):** Provide a working demo URL.

---

## 📞 Contact
For any queries, feel free to reach out!

---

🛠 Built with ❤️ using **React, Node.js, Express, MongoDB**.

