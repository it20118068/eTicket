package com.sliit.eticket;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;
import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.i.ReservationService;
import com.sliit.eticket.service.i.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ProfileFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
/**
 *  User profile fragment
 * */
public class ProfileFragment extends Fragment {


    private AppUserDto userDto;
    Context context;

    private DatabaseHelper databaseHelper;
    private String nic,id,token;
    private boolean isLogged;
    private UserService userService;
    private static final String BASE_URL = "http://10.0.2.2:7211/api/";

    private TextView lblName, lblNic, lblMobile, lblEmail, lblUsername;



    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    Button btnEditAccount, btnDeactivateAccount;

    public ProfileFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ProfileFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ProfileFragment newInstance(String param1, String param2) {
        ProfileFragment fragment = new ProfileFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }



    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        context = getActivity();
        databaseHelper = new DatabaseHelper(getActivity());
        fetchDetails();
        userDto = new AppUserDto();

        lblName = getView().findViewById(R.id.lbl_name);
        lblNic = getView().findViewById(R.id.lbl_nic);
        lblMobile = getView().findViewById(R.id.lbl_mobile);
        lblEmail = getView().findViewById(R.id.lbl_email);
        lblUsername = getView().findViewById(R.id.lbl_username);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userService = retrofit.create(UserService.class);

        RequestDto requestDto = new RequestDto();
        requestDto.setNic(nic);

        Call<ResponseDto> call = userService.getAccountById("Bearer " + token, requestDto);
        //Make an api call to fetch the user from the server
        call.enqueue(new Callback<ResponseDto>() {
            @Override
            public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                if(response != null){
                    userDto = response.body().getUserDTOs().get(0);
                    lblName.setText(response.body().getUserDTOs().get(0).getFirstName() + " " + response.body().getUserDTOs().get(0).getLastName());
                    lblNic.setText(response.body().getUserDTOs().get(0).getNic());
                    lblMobile.setText(response.body().getUserDTOs().get(0).getMobileNo());
                    lblEmail.setText(response.body().getUserDTOs().get(0).getEmail());
                    lblUsername.setText(response.body().getUserDTOs().get(0).getUserName());
                } else {
                    Toast.makeText(context, "Something went wrong, please try again.",Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseDto> call, Throwable t) {
                Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });


        btnEditAccount = getView().findViewById(R.id.btn_editProfile);
        btnDeactivateAccount = getView().findViewById(R.id.btn_deactivate);

        //Handle deactivate user
        btnDeactivateAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                builder.setTitle("Deactivate Account");

                builder.setMessage("Are you sure you want to deactivate your account?");

                builder.setNegativeButton("Confirm", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        startActivity(new Intent(getActivity(), LoginActivity.class));

                        userDto.setActive(false);
                        RequestDto requestDto2 = new RequestDto();
                        requestDto2.setUserDTO(userDto);

                        Call<ResponseDto> call2 = userService.updateUserProfileById("Bearer " + token, requestDto2);
                        // Make an api call to update user status
                        call2.enqueue(new Callback<ResponseDto>() {
                            @Override
                            public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                                if(response != null){
                                    Toast.makeText(context, "Account Deactivated Successfully",Toast.LENGTH_LONG).show();
                                    Intent i = new Intent(context, LoginActivity.class);
                                    startActivity(i);
                                } else {
                                    Toast.makeText(context, "Something went wrong, please try again.",Toast.LENGTH_LONG).show();
                                }

                            }

                            @Override
                            public void onFailure(Call<ResponseDto> call, Throwable t) {
                                Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
                            }
                        });


                    }
                });

                builder.setPositiveButton("Close", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });


                builder.show();
            }
        });

        // Handle edit user profile button
        btnEditAccount = getView().findViewById(R.id.btn_editProfile);
        btnEditAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(getActivity(), EditProfileActivity.class);
                i.putExtra("PROFILE", userDto);
                startActivity(i);
            }
        });

    }

    private void fetchDetails (){
        SQLiteDatabase db = databaseHelper.getReadableDatabase();

        Cursor cursor = db.query(
                DatabaseHelper.TABLE_NAME,
                new String[]{DatabaseHelper.COLUMN_ID, DatabaseHelper.COLUMN_NIC, DatabaseHelper.COLUMN_LOGGED, DatabaseHelper.COLUMN_TOKEN},
                DatabaseHelper.COLUMN_ID + " = ?",
                new String[]{String.valueOf(1)},
                null,
                null,
                null
        );

        AppUserDto appUser = null;

        if (cursor != null && cursor.moveToFirst()) {
            int nicIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_NIC);
            int loggedIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_LOGGED);
            int tokenIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_TOKEN);
            int idIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_ID);



            this.nic = cursor.getString(nicIndex);
            this.isLogged = cursor.getInt(loggedIndex) == 1;
            this.token = cursor.getString(tokenIndex);
            this.id = cursor.getString(idIndex);
        }

        if (cursor != null) {
            cursor.close();
        }

        db.close();
    }
}