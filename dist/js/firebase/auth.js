/* 
  firebase 認証機能
 */

let loginUser;
let userPhoto = $("userPhoto");
let userName = $("userName");

let userFC = () => {
  if( firebase.auth().currentUser != null){
    main.style = undefined;
    loginBtn.disabled = true;
    logoutBtn.disabled = false;
    loginUser = firebase.auth().currentUser;
    userName.textContent = `ログインユーザー名：${user.displayName}`;
    // userPhoto.src = user.photoURL;
    userPhoto.src = 'https://lh4.googleusercontent.com/-F4BlrVyQVNc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnnkvNSOT3A3H3UHFHwEBledVS67g/photo.jpg';
    userPhoto.style = "border-radius: 50%;width: 34px;";
  }
}

// ログイン処理
let loginFC = ()=> {
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    l("Login successful.")
    // location.reload();
  }).catch(function(error) {
    errorCode = error
  });
};

// ログイン方法がリダイレクトの場合
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    l("redirected")
    location.reload();
  }
}).catch(function(error) {
  l("redirected false")
});

// ログアウト処理
let logoutFC = ()=> {
  firebase.auth().signOut().then(() => {
    l("Sign-out successful.")
    location.reload();
  }).catch(function(error) {
    l("An error happened.")
  });
}