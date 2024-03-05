import userRouter from '../modules/user/user.routes.js'
import postRouter from '../modules/post/post.routes.js' 


const useRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);
};

export default useRoutes;
