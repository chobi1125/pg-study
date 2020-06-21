/* 
  firebase 認証機能
 */

let login_user;
let user_photo = $("userPhoto");
let user_name = $("userName");
let login_btn = $("loginBtn");
let logout_btn = $("logoutBtn");

// ログイン確認&ログインしていた場合の処理
let loggedInFC = () => {
  if( firebase.auth().currentUser != null){
    login_btn.disabled = true;
    logout_btn.disabled = false;
    login_user = firebase.auth().currentUser;
    user_name.textContent = `ログインユーザー名：${login_user.displayName}`;
    user_photo.src = login_user.photoURL;
    // user_photo.src = 'https://lh4.googleusercontent.com/-F4BlrVyQVNc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnnkvNSOT3A3H3UHFHwEBledVS67g/photo.jpg';
    user_photo.style = "border-radius: 50%;width: 34px;";
    main_display_none.className = "display-block";
  }
}

// ログイン処理
let loginFC = ()=> {
  firebase.auth().signInWithRedirect(provider).then(function(result) {
  }).catch(function(error) {
    errorCode = error
  });
};

// ログイン方法がリダイレクトの場合
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
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
    l("logout false")
  });
}