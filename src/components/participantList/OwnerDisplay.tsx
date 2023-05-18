export default function OwnerDisplay(
  loginUser: any,
  newEntryUsers: any[],
  anotherUser: any
) {
  return (
    <>
      <tr key={loginUser.id}>
        <td>
          <img src={loginUser.icon} />
          {loginUser.family_name}
          {loginUser.first_name}
          (オーナー)
        </td>
        <td></td>
      </tr>
      {newEntryUsers.map((user) => {
        return (
          <tr key={user.id}>
            {anotherUser(user)}
            <td>
              <button>島主権限を譲渡</button>
              <button>島追放</button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
