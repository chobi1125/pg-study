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
    before_login.className = "display-none";
    login_btn.className = "display-none";
    logout_btn.className = "display-inline";
    test_login_btn.className = "display-none";
    login_user = firebase.auth().currentUser;
    user_name.textContent = `ログインユーザー名：テストユーザー※ログアウトでデータが消えます`;
    if(firebase.auth().currentUser.displayName != null){
      user_name.textContent = `ログインユーザー名：${login_user.displayName}`;
      user_photo.src = login_user.photoURL;
      user_photo.style = "border-radius: 50%;width: 34px;";
    }
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

// テストログイン
let testLoginFC = () => {
  firebase.auth().signInAnonymously()
  .catch(function(error) {
    console.log(error.message);
  });
  firebase.auth().onAuthStateChanged(function(user) {
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    location.reload();
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