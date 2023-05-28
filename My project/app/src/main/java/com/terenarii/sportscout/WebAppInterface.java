package com.terenarii.sportscout;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class WebAppInterface {
    Context mContext;
    WebView mWebView;
    String data;

    WebAppInterface(Context ctx, WebView webView){
        this.mContext=ctx;
        this.mWebView=webView;

        if (FirebaseApp.getApps(mContext).isEmpty()) {
            FirebaseApp.initializeApp(mContext);
        }
    }

    FirebaseDatabase db = FirebaseDatabase.getInstance();
    FirebaseAuth auth = FirebaseAuth.getInstance();


    //Check if the user is signed in or not
    @JavascriptInterface
    public boolean checkSignIn() {
        if (auth.getCurrentUser()!=null) {
            // showToast("You are signed in!");
            return true;
        }
        // showToast("You are NOT signed in!");
        return false;
    }

    //Sign in the user
    @JavascriptInterface
    public void login(String email, String password) {
        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Login successful
                            showToast("Login successful");
                            runJSFunction("checkUser()");
                        }
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        // Error occurred during sign-in
                        showAlert("Error", e.getMessage());
                    }
                });
    }

    //Create user account
    @JavascriptInterface
    public void create(String email, String password, String username) {
        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            FirebaseUser user = auth.getCurrentUser();
                            showToast("Authentication successful");
                            runJSFunction("createProfile('"+ username +"')");
                            runJSFunction("checkUser()");
                        } else {
                            // If sign in fails, display a message to the user.
                            showToast("Authentication failed");
                            runJSFunction("checkUser()");
                        }
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        // Error occurred during sign-in
                        showAlert("Error", e.getMessage());
                    }
                });
    }

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    //Get value from db
    @JavascriptInterface
    public String getInfo(String path) {
        Task<DataSnapshot> task = myRef.child(path).get();
        try {
            Tasks.await(task); // Wait for the task to complete
            if (task.isSuccessful()) {
                Object object = task.getResult().getValue(Object.class);
                return new Gson().toJson(object);
            } else {
                showToast("Error getting data");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null; // Return null in case of error or exception
    }

    @JavascriptInterface
    public String getUid() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        return user.getUid();
    }

    @JavascriptInterface
    public void writeData(String path, String father, String data) {
        Object json = new Gson().fromJson(data, Object.class);
        myRef.child(path).child(father).setValue(json);
    }


    /*
    *   +-------------------------------------------------------------+
    *   | Below here will be all the mini functions used in this file |
    *   +-------------------------------------------------------------+
    * */


    //Sign the user out
    @JavascriptInterface
    public void signOut() {
        auth.signOut();
        showToast("Logged out");
        redirectTo("index.html");
    }

    //Redirect page
    @JavascriptInterface
    public void redirectTo(String page) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                String url = "file:///android_asset/pages/" + page;
                if (!mWebView.getUrl().equals(url)) {
                    mWebView.loadUrl(url);
                }
            }
        });
    }

    //Show an alert box
    @JavascriptInterface
    public void showAlert(String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext, R.style.CustomAlertDialogStyle);
        builder.setTitle(title)
                .setMessage(message)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // Do something when the user clicks "OK"
                    }
                })
                .show();
    }

    //Show a toast message
    @JavascriptInterface
    public void showToast(String message) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
    }

    //Run JS scripts
    @JavascriptInterface
    public void runJSFunction(String function) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.evaluateJavascript(function, null);
            }
        });
    }
}
