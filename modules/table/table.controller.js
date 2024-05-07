import Tables, { tableModel } from "../../model/table.js";

export const changeStatus = async (req, res) => {
    try {
        newStatus = req.body.status;
        tableChanged = Tables.updateStatus(req.params.id, newStatus);
        res.status(200).json({ success: true, data: tableChanged });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi" });
    }
};