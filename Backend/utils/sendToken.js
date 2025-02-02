export const sendToken = async (user, statusCode, message, res) => {
  const token = await user.generateToken()
  const cookieExpireDate = new Date();
  cookieExpireDate.setDate(cookieExpireDate.getDate() + parseInt(process.env.COOKIE_EXPIRES));

  res.status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: cookieExpireDate,
    })
    .json({
      success: true,
      message,
    });
};
