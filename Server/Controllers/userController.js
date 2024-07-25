const supabase = require('../supabase');

const UserController = {
    async registerUser(req, res, next) {
        const { email, password, firstName, lastName } = req.body;
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) {
            console.error('Error registering user:', authError);
            return res.status(500).json({ error: authError.message });
        }

        res.locals.authData = authData;
        next();
    },

    async createUser(req, res) {
        const { email, firstName, lastName, area, subscribedInterests, picture } = req.body;
        const fullName = `${firstName} ${lastName}`;

        const { data, error } = await supabase
            .from('users')
            .insert({ email, name: fullName, area, subscribedInterests, picture })
            .single();

        if (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'User registered and created successfully', data });
    },

    async loginUser(req, res) {
        const { email, password } = req.body;
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            console.error('Error logging in:', authError);
            return res.status(500).json({ error: authError.message });
        }

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError) {
            console.error('Error fetching user data:', userError);
            return res.status(500).json({ error: userError.message });
        }

        res.status(200).json({ message: 'User logged in successfully', userData: { ...authData, ...userData } });
    },

    async getUser(req, res) {
        const userId = req.params.id;
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(data);
    },

    async getUserEvents(req, res) {
        const userId = req.params.id;
        const { data, error } = await supabase
            .from('attendance')
            .select('event_id, events (name)')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user events:', error.message);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(data);
    }
};

module.exports = UserController;
