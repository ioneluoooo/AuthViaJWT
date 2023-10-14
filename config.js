
// in ESM (ECMAScript Modules) you can use ' export default ' 
// but in CommonJs is used ' module.exports ' 
// the choice is yours

module.exports = {
    secret: 'SECRET_KEY_RANDOM'
}
// When a client sends a JWT with a request, the server uses the same secret key to verify the token's authenticity. It checks if the signature on the received token matches what it would expect if it were to recompute the signature using the same payload and the secret key.
//If the signature matches, it means the token hasn't been tampered with, and the data in the token is trustworthy. This allows the server to authenticate the user and determine their authorization based on the token's claims (e.g., user ID, roles).
//  If someone gains access to the key, they could generate fake tokens or modify existing ones, potentially compromising your application's security
// That is why you should set an {expiresIn: 'time'}