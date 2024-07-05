import Bars from "../../model/bar.js";
import Table from "../../model/table.js";

/**
 * Create tables for bar
 *  - Tạo các bàn lỗ
 *  - Tạo các bàn trơn
 *  - Thêm id của các bàn vào quán bida
 * @param {Object} newBar - Quán bida mới tạo
 * @returns {Promise<void>}
 */
export const createTable = async (newBar) => {
    try {
        const tables = [];
        for(let i = 1; i <= newBar.amount_table_type_hole; i++){
            const table = Table.create({
                bar_id: newBar._id,
                table_number: i,
                status: Table.STATUS_AVAILABLE,
                type: Bars.TYPE_HOLE,
            });
            tables.push(table);
        }
        for(let i = 1; i <= newBar.amount_table_type_carom; i++){
            const table = Table.create({
                bar_id: newBar._id,
                table_number: i,
                status: Table.STATUS_AVAILABLE,
                type: Bars.TYPE_CAROM,
            });
            tables.push(table);
        }
        Bars.addTableIdForBar(newBar._id, tables);
        return true;    
    } catch (error) {
        console.log(error);
        return false;
    }
};