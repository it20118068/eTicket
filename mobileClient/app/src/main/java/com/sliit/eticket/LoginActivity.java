package com.sliit.eticket;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.AuthRequestDto;
import com.sliit.eticket.dto.AuthResponseDto;
import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.i.AuthService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/*
 *  User Login activity
 * */
public class LoginActivity extends AppCompatActivity {

    private EditText txtUsername, txtPassword;
    private Button btnLogin;

    private static final String BASE_URL = "http://10.0.2.2:7211/api/";
    private AuthService authService;

    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        context = this;
        txtUsername = findViewById(R.id.txt_username);
        txtPassword = findViewById(R.id.txt_password);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        authService = retrofit.create(AuthService.class);

    }

    // Hanlde login button click
    public void handleLogin(View view) {

        AuthRequestDto authRequestDto = new AuthRequestDto(txtUsername.getText().toString(),txtPassword.getText().toString());

        Call<AuthResponseDto> call = authService.authenticateUser(authRequestDto);

        // Make an api call to authenticate user
        call.enqueue(new Callback<AuthResponseDto>() {
            @Override
            public void onResponse(Call<AuthResponseDto> call, Response<AuthResponseDto> response) {
                if(response != null && response.body() != null && response.body().getToken() != null){



                    DatabaseHelper databaseHelper = new DatabaseHelper(context);
                    SQLiteDatabase db = databaseHelper.getWritableDatabase();

                    AppUserDto userDto = response.body().getData().get(0);

                    ContentValues values = new ContentValues();
                    values.put(DatabaseHelper.COLUMN_ID, 1); // Always set the id to 1
                    values.put(DatabaseHelper.COLUMN_USERNAME, userDto.getUserName());
                    values.put(DatabaseHelper.COLUMN_NIC, userDto.getNic());
                    values.put(DatabaseHelper.COLUMN_LOGGED, 1);
                    values.put(DatabaseHelper.COLUMN_TOKEN, response.body().getToken());

                    // Update the row where id = 1
                    int rowsUpdated = db.update(
                            DatabaseHelper.TABLE_NAME,
                            values,
                            DatabaseHelper.COLUMN_ID + " = 1",
                            null
                    );

                    if (rowsUpdated <= 0) {
                        values.put(DatabaseHelper.COLUMN_ID, 1);
                        db.insert(DatabaseHelper.TABLE_NAME, null, values);
                    }


                    // Close the database connection
                    db.close();
                    startActivity(new Intent(context, MainActivity.class));
                } else {
                    Toast.makeText(context,"Authentication failed. Please try again!",Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponseDto> call, Throwable t) {
                Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });
    }

    // Handle Sign up button
    public void handleSignup(View view){
        Intent i = new Intent(this, RegisterActivity.class);
        startActivity(i);
    }
}