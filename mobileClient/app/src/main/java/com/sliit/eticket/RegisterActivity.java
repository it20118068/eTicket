package com.sliit.eticket;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.AuthResponseDto;
import com.sliit.eticket.service.i.AuthService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 *  User register activity
 * */
public class RegisterActivity extends AppCompatActivity {

    private TextView username, email, fname, lname, nic, mobile, password;

    private static final String BASE_URL = "http://10.0.2.2:7211/api/";
    private AuthService authService;

    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        username = findViewById(R.id.txt_username);
        email = findViewById(R.id.txt_email);
        fname = findViewById(R.id.txt_fname);
        lname = findViewById(R.id.txt_lname);
        nic = findViewById(R.id.txt_nic);
        mobile = findViewById(R.id.txt_mobile);
        password = findViewById(R.id.txt_password);

        context = this;

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        authService = retrofit.create(AuthService.class);

    }

    //Handle login button click
    public void handleLogin(View view) {
        Intent i = new Intent(this, LoginActivity.class);
        startActivity(i);
    }

    // Handle user registration
    public void handleSignUp(View view) {
        AppUserDto userDto = new AppUserDto();
        userDto.set_id("");
        userDto.setUserName(username.getText().toString());
        userDto.setPassword(password.getText().toString());
        userDto.setRole("0");
        userDto.setNic(nic.getText().toString());
        userDto.setFirstName(fname.getText().toString());
        userDto.setLastName(lname.getText().toString());
        userDto.setMobileNo(mobile.getText().toString());
        userDto.setEmail(email.getText().toString());
        userDto.setActive(true);

        Call<AuthResponseDto> call = authService.register(userDto);
        // Make an api call to save the user
        call.enqueue(new Callback<AuthResponseDto>() {
            @Override
            public void onResponse(Call<AuthResponseDto> call, Response<AuthResponseDto> response) {
                if(response != null){
                    Toast.makeText(context,"Registration Successful.",Toast.LENGTH_LONG).show();
                    Intent i = new Intent(context, LoginActivity.class);
                    startActivity(i);
                } else {
                    Toast.makeText(context,"Registration failed. Please try again!",Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponseDto> call, Throwable t) {
                Toast.makeText(context,"Registration failed. Please try again!",Toast.LENGTH_LONG).show();
            }
        });
    }
}