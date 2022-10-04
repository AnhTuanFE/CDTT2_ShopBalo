function ForgotPassword() {
    return ( 
    <>
        <body>
            <h1>email</h1>
            <form action="" method="post">
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
            /><br />
            <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="confirm-password"
            /><br />
            <input type="submit" value="submit" />
            </form>
        </body>
    </> );
}

export default ForgotPassword;