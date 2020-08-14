const router = require("express").Router();
const Account = require("../services/account");
const User = require("../services/user");
const Transaction = require("../services/transaction");
const asyncHandler = require("express-async-handler");
const { Sequelize } = require("sequelize");
const { body, validationResult } = require("express-validator");
const Op = Sequelize.Op;

router.get(
    "/",
    asyncHandler(async (req, res) => {
        req.currentUser = req.currentUser ? req.currentUser : [];
        const account = await Account.findByUserId(req.currentUser.id);

        if (account) {
            return res.render("./ducbui/pages/admin/admin");
        } 

        res.redirect("/logout");
    })
);

router
    .route("/users")
    .get(
        asyncHandler(async (req, res) => {
            const a = await Account.findAll({
                where:{
                    role:"user",
                },
                include: [{
                  model: User,
                  
                 }]
              }).then(Account => {
                 Account.forEach(e => {
                     const {user} =e;
                 })
                return res.json(Account);
                //  const {user} = Account[0];
                 
                // console.log(Account)
                // console.log(user)
                
              });
            
            // console.log("co vao")
            // const users = await User.findAll();
            // return res.json(users);
        })
    )

    /// Find user
    // Find user by Username, Account Number, Email
    .post(
        asyncHandler(async (req, res) => {
            const { search } = req.body;
            let result = [];
            
            result = await Account.findAll({
                where: {
                    role: "user",
                },
                include: [
                    {
                        model: User,
                        where: {
                            [Op.or]: [
                                {
                                    email: { [Op.like]: "%" + search + "%" },
                                },
                                {
                                    username: { [Op.like]: "%" + search + "%" },
                                },
                            ],
                        },
                    },
                ],
            });

            if (result.length === 0) {
                result = await Account.findAll({
                    where: {
                        role: "user",
                        accountNumber: { [Op.like]: "%" + search + "%" },
                    },
                });
            }

            res.render("./ducbui/pages/admin/users", { users: result });
        })
    );

// Find pending users
router.get(
    "/users/management",
    asyncHandler(async (req, res) => {
        const a = await Account.findAll({
            where:{
                status:"PENDING"
            },
            include: [{
              model: User,
             
             }]
          }).then(Account => {
             Account.forEach(e => {
                 const {user} =e;
             })
            return res.json(Account);
            //  const {user} = Account[0];
             
            // console.log(Account)
            // console.log(user)
            
          });

    })
);

// Verify CardID
// - Accept
router
    .route('/users/:id')
    .get(async (req,res)=>{ //get transaction
        const { id } = req.params;

        const account = await Account.findByUserId(id);
        if (account) {
            const transactions = await Transaction.findAll({
                where: {
                    [Op.or]: [
                        {
                            accountNumber: account.accountNumber,
                        },
                        {
                            beneficiaryAccount: account.accountNumber,
                        },
                    ],
                },
            });

            res.json(transactions); // Marked
        }

        // res.redirect(`/admin/users/${id}`);
        // res.render(`./ducbui/pages/admin/transactions`, { transactions: res.locals.transactions, account });
    })
    .post( [
        body("data.email")
            .isEmail()
            .optional()
            .normalizeEmail()
            .custom(async (email, { req }) => {
                const { id } = req.params;
                const user = await User.findById(id);
                const found = await User.findByEmail(email);
                if (found && email !== user.email) {
                    throw Error("User exists");
                }
                

                return true;
            }),
        body("data.username")
            .optional()
            .custom(async (username, { req }) => {
                const found = await User.findByUsername(username);
                const { id } = req.params;
                const user = await User.findById(id);
                if (found && username !== user.username) {
                    throw Error("User exists");
                }

                return true;
            }),
        body("data.displayName").trim().optional(),
        body("data.cardId").trim().optional(),

    ],async (req,res)=>{    //cap nhat thong tin MODIFY
        console.log("1")
        const errors = validationResult(req);
        console.log("2")
        // API here
        if (!errors.isEmpty()) {
            console.log("3")
            return res.json({success:false , errors: errors.array() });
            
        }
        console.log("4")
        const {data} = req.body;
        const { id } = req.params;
        const {email,username,displayName,cardId} =data
        console.log("5")
        console.log (email + "  " +username +"   "+displayName+"    "+cardId)
        await User.update(
            {
                email,
                username,
                displayName,
                cardId,
            },
            {
                where: {
                    id,
                },
            }
        );
        console.log("6")
        const newAccountUser = await Account.findOne({
            include: [{
                 model: User,
                where:{
                    id:id
                }
            }]
        })
        console.log("7")
        return res.json(newAccountUser)
    })
    .put(async (req,res)=>{  //Them tien 
        const {amount} = req.body;
        console.log(amount);
        const { id } = req.params;
        const account = await Account.findByUserId(id);
        const newBalance = parseInt(account.balance)+parseInt(amount);
        await Account.updateBalance(newBalance,account.accountNumber);
        const a = await Account.findOne({
            include: [{
                model: User,
                where : {
                    id:id
                }
            }]
        })

        res.json(a) 
    })


router.get(
    "/users/:id/verify-accept",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const account = await Account.findByUserId(id);
        if (account) {
            await Account.update(
                {
                    status: "ACTIVE",
                    limit: 20000000,
                },
                {
                    where: {
                        userId: id,
                    },
                }
            );
        }
        const newAccountUser = await Account.findOne({
            include: [{
                 model: User,
                where:{
                    id:id
                }
            }]
        })

        res.json(newAccountUser);
    })
);

// - Deny
router.get(
    "/users/:id/verify-deny",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const account = Account.findByUserId(id);
        if (account) {
            await Account.update(
                {
                    status: "DENIED",
                },
                {
                    where: {
                        userId: id,
                    },
                }
            );
        }

        const newAccountUser = await Account.findOne({
            include: [{
                model: User,
                where:{
                    id:id
                }
            }]
        })

        res.json(newAccountUser);
    })
);
// End Verify CardID
/// End find user

/// Check user profile
router.get(
    "/users/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const user = await User.findById(id);
        const account = await Account.findByUserId(id);

        res.locals.transactions = []; // Marked

        res.render(`./ducbui/pages/admin/details`, { user, account });
    })
);

// Lock/Unlock account
router.get(
    "/users/:id/lock",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const account = await Account.findByUserId(id);
        let status = null;

        if (account.status === "ACTIVE") {
            status = "LOCKED";
        } else if (account.status === "LOCKED") {
            status = "ACTIVE";
        }

        if (account) {
            await Account.update(
                {
                    status,
                },
                {
                    where: {
                        userId: id,
                    },
                }
            );
        }

        const newAccountUser = await Account.findOne({
            include: [{
                model: User,
                where : {
                    id : id
                }
            }]
        })
        console.log("---------------")
        console.log(newAccountUser)
        return res.json(newAccountUser)
    })
);
/// End check user profile

/// Check user's transactions
router.get(
    "/users/:id/transaction",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const account = await Account.findByUserId(id);
        if (account) {
            const transactions = await Transaction.findAll({
                where: {
                    [Op.or]: [
                        {
                            accountNumber: account.accountNumber,
                        },
                        {
                            beneficiaryAccount: account.accountNumber,
                        },
                    ],
                },
            });

            res.locals.transactions = transactions; // Marked
        }

        // res.redirect(`/admin/users/${id}`);
        res.render(`./ducbui/pages/admin/transactions`, { transactions: res.locals.transactions, account });
    })
);
/// End Check user's transactions

/// Transfer
router
    .route("/users/:id/transfer")
    .get(
        asyncHandler(async (req, res) => {
            const { id } = req.params;

            const user = await User.findById(id);
            if (user) {
                return res.render("./ducbui/pages/admin/transfer", { user });
            }

            res.redirect("back");
        })
    )
    .post(
        [body("amount").isNumeric().notEmpty()],
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { amount } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(442).json({ errors: errors.array() });
            }

            const account = await Account.findByUserId(id);
            if (account) {
                const balance = Number(account.balance) + Number(amount);
                console.log(balance);
                await Account.update(
                    {
                        balance,
                    },
                    {
                        where: {
                            userId: id,
                        },
                    }
                );
            }

            res.redirect(`/admin/users/${id}`);
        })
    );
/// End Transfer

/// Edit user profile
router
    .route("/users/:id/modify")
    .get(
        asyncHandler(async (req, res) => {
            const { id } = req.params;

            const user = await User.findById(id);
            if (user) {
                req.session.currentCustomer = user;
                return res.render(`./ducbui/pages/admin/editProfile`, { user });
            }

            res.redirect("back");
        })
    )
    .post(
        [
            body("email")
                .isEmail()
                .optional()
                .normalizeEmail()
                .custom(async (email, { req }) => {
                    const found = await User.findUserByEmail(email);

                    if (found && email !== req.session.currentCustomer.email) {
                        throw Error("User exists");
                    }

                    return true;
                }),
            body("username")
                .optional()
                .custom(async (username, { req }) => {
                    const found = await User.findUserByUserName(username);

                    if (found && username !== req.session.currentCustomer.username) {
                        throw Error("User exists");
                    }

                    return true;
                }),
            body("displayName").trim().optional(),
            body("cardId").trim().optional(),
            // .isLength({ min: 9, max: 9 }),
        ],
        asyncHandler(async (req, res) => {
            const { id } = req.params;
            const { email, username, displayName, cardId } = req.body;

            const errors = validationResult(req);

            // API here
            if (!errors.isEmpty()) {
                return res.status(442).json({ errors: errors.array() });
            }

            user = await User.findById(id);

            if (user) {
                await User.update(
                    {
                        email: email ? email : user.email,
                        username: username ? username : user.username,
                        displayName: displayName ? displayName : user.displayName,
                        cardId: cardId ? cardId : user.cardId,
                    },
                    {
                        where: {
                            id,
                        },
                    }
                );
            }

            res.redirect(`/admin/users/${id}`);
        })
    );
/// End edit user profile

module.exports = router;
