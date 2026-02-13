import pool from "./config/db.js";

const createAppointment = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [appointmentResult] = await connection.query(
      "INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)",
      [1, 2, "2026-02-20"],
    );

    const [paymentResult] = await connection.query(
      "INSERT INTO payments (appointment_id, amount) VALUES (?, ?)",
      [appointmentResult.insertId, 500],
    );

    await connection.commit();

    res.status(201).json({
      message: "Appointment booked successfully",
    });
  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      message: "Transaction failed",
    });
  } finally {
    connection.release();
  }
};
