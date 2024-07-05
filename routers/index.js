import userRouter from '../modules/user/user.routes.js'
import barRouter from '../modules/bar/bar.routes.js' 
import profileRouter from '../modules/profile/profile.routes.js' 
import tableRouter from '../modules/table/table.routes.js'
import bookingRouter from '../modules/booking/booking.routes.js'
import discountRouter from '../modules/discount/discount.routes.js'
import cityRouter from '../modules/city/city.routes.js'
import districtRouter from '../modules/district/district.routes.js'



const useRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/bar', barRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/table', tableRouter);
    app.use('/api/booking', bookingRouter);
    app.use('/api/discount', discountRouter);
    app.use('/api/city', cityRouter);
    app.use('/api/district', districtRouter);
};

export default useRoutes;
