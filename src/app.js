const express = require("express");
const app = express();
const certificateRoutes = require("./routes/certificateRoutes");

app.use(express.json());
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
