const stripe = require('stripe')('sk_test_51N5c57DvWceembxrXkEdX58VdahYNRbL8K6RJ1ccILUpfzRjBfS0jN1ynp49Vi9NT6tL0StibUaOlO1ZGzCKdOvc00nmraV4lI')
module.exports = function PaymentController(Service, options = {}) {
    return {
        getAll: async (req, res) => {
            res.send("tes")
        },
        getOne: async (req, res) => {
            const {id} = req.params;
            try {
                const result = await Service.findOne({id: parseInt(id, 10)});
                if (result) res.json(result);
                else res.sendStatus(404);
            } catch (err) {
                res.status(500).json(err);
            }
        },
        create: async (req, res) => {
            console.log("ok")
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'T-shirt',
                            },
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:5173/payment',
                cancel_url: 'http://localhost:5173/payment',
            });
            res.json({ redirectUrl: session.url });
        },
        replace: async (req, res) => {
            const {id} = req.params;
            const {body} = req;
            try {
                const [[result, created]] = await Service.replace(
                    {id: parseInt(id, 10)},
                    {id: parseInt(id, 10), ...body}
                );
                if (created) res.status(201).json(result);
                else res.json(result);
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(422).json(err.errors);
                } else {
                    res.status(500).json(err);
                }
            }
        },
        update: async (req, res) => {
            const {id} = req.params;
            const {body} = req;
            try {
                const [result] = await Service.update({id: parseInt(id, 10)}, body);
                if (result) res.json(result);
                else res.sendStatus(404);
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(422).json(err.errors);
                } else {
                    res.status(500).json(err);
                }
            }
        },
        delete: async (req, res) => {
            const {id} = req.params;
            try {
                const nbDeleted = await Service.delete({id: parseInt(id, 10)});
                if (nbDeleted) res.sendStatus(204);
                else res.sendStatus(404);
            } catch (err) {
                res.status(500).json(err);
            }
        },
    };
};
