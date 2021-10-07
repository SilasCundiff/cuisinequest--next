export const UsernameModule = ({
  usernameFormValue,
  onChange,
  isValid,
  loading,
  isLongEnough,
  isFirstTimePast3Chars,
}) => {
  return (
    <div>
      <h1 className='text-5xl mb-4 text-green-500 font-bold'>
        Welcome! Before you dig in, please choose a username!
      </h1>
      <input
        className='w-1/2 bg-gray-100 text-2xl font-light tracking-widest px-2 py-1 rounded mb-4'
        name='username'
        placeholder='myname'
        value={usernameFormValue}
        onChange={onChange}
      />
      <UsernameMessage
        username={usernameFormValue}
        isValid={isValid}
        loading={loading}
        isLongEnough={isLongEnough}
        isFirstTimePast3Chars={isFirstTimePast3Chars}
      />
    </div>
  );
};

function UsernameMessage({
  username,
  isValid,
  loading,
  isLongEnough,
  isFirstTimePast3Chars,
}) {
  if (loading) {
    return <p className='h-8 text-xl mb-10'>Checking...</p>;
  } else if (!isLongEnough && username.length > 0) {
    return (
      <p className='h-8 text-xl text-red-800 mb-10'>{username} is to short!</p>
    );
  } else if (isValid) {
    return (
      <p className='h-8 text-xl text-green-700 mb-10'>
        {username} is available!
      </p>
    );
  } else if (username && !isValid && !isFirstTimePast3Chars) {
    return (
      <p className='h-8 text-xl text-red-800 mb-10'>That username is taken!</p>
    );
  } else {
    return <p className='h-8 mb-10'></p>;
  }
}
