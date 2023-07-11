export async function authValidation(req, res, next) {
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) {
        return res.sendStatus(401)
    }

    try {
        const session = await db.collection("session").findOne({ token })
        if (!session) {
            return res.sendStatus(401)
        }
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}