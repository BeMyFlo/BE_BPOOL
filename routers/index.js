import userRouter from '../modules/user/user.routes.js'
import postRouter from '../modules/post/post.routes.js' 
import profileRouter from '../modules/profile/profile.routes.js' 



const useRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);
    app.use('/api/profile', profileRouter);
};

export default useRoutes;
