const Record = require("../models/recordModel");

// CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET RECORDS (Pagination + Filter + Sorting 🔥)
exports.getRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = {};

    // Filters
    if (req.query.type) query.type = req.query.type;
    if (req.query.category) query.category = req.query.category;

    const records = await Record.find(query)
      .sort({ createdAt: -1 }) // latest first 🔥
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Record.countDocuments(query);

    res.json({
      success: true,
      page,
      limit,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DASHBOARD SUMMARY
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    const totalIncome = records
      .filter((r) => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter((r) => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // Category-wise summary
    const categorySummary = {};
    records.forEach((r) => {
      categorySummary[r.category] =
        (categorySummary[r.category] || 0) + r.amount;
    });

    res.json({
      success: true,
      totalIncome,
      totalExpense,
      netBalance,
      categorySummary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};