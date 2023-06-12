const notFoundMiddleware = (req, res) => {
    res.status(404).send({ msg: "Route not found" });
}

export default notFoundMiddleware