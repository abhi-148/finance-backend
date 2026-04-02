const Record = require("../models/recordModel");


exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = {};

    if (req.query.type) query.type = req.query.type;
    if (req.query.category) query.category = req.query.category;

    const records = await Record.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      limit,
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    const totalIncome = records
      .filter(r => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter(r => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    res.json({ totalIncome, totalExpense, netBalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};