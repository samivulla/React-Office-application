const Auth = {
    isAuthenticated: false,
    // singin() {

    // }
    authenticate(data) {
        var user = JSON.parse(localStorage.getItem('myData'));
        if (user != undefined) {
            var count = Object.keys(user).length;
        }
        if (count) {
            this.isAuthenticated = true;
        } else {
            if (data == 'dashboard')
                alert('please do login first')
        }
    },

    signout() {
        localStorage.clear();
        this.isAuthenticated = false;
    },

    getAuth() {
        var user = JSON.parse(localStorage.getItem('myData'));
        if (user == null) {
            this.isAuthenticated = false;
        } else {
            this.isAuthenticated = true;
        }
        return this.isAuthenticated;
    }
};

export default Auth;