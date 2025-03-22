// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { RootState } from '../store/store'


// const ChallengesPage = () => <div>Challenges Page</div>;
// const WorkoutsPage = () => <div>Workouts Page</div>;

// const AppRoutes: React.FC = () => {
//     const { currentUser } = useSelector((state: RootState) => state.auth);

//     return (
//         <Routes>
//             {/* ניתובים ציבוריים */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={
//                 currentUser ? <Navigate to="/" replace /> : <LoginPage />
//             } />
//             <Route path="/register" element={
//                 currentUser ? <Navigate to="/" replace /> : <RegisterPage />
//             } />
//             <Route path="/user/:userId" element={<UserProfile />} />

//             {/* ניתובים מאובטחים */}
//             <Route path="/profile" element={
//                 <PrivateRoute>
//                     <ProfilePage />
//                 </PrivateRoute>
//             } />
            
//             <Route path="/challenges" element={
//                 <PrivateRoute>
//                     <ChallengesPage />
//                 </PrivateRoute>
//             } />
            
//             <Route path="/workouts" element={
//                 <PrivateRoute>
//                     <WorkoutsPage />
//                 </PrivateRoute>
//             } />

//             {/* ניתוב ברירת מחדל - מפנה לדף הבית */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//     );
// };

// export default AppRoutes; 