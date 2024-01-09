import userRouter from '../modules/user/user.routes.js'
import productRouter from '../modules/product/product.routes.js' 
import categoryRouter from '../modules/category/category.routes.js' 


const useRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
};

export default useRoutes;
