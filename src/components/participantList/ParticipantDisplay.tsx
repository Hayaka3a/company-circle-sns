import { Person } from "../../../types/index";

export default function OwnerDisplay(
  loginUser: any,
  newEntryUsers: Person[],
  anotherUser: any
) {
  const newPerson = newEntryUsers;
  return (
    <>
      {/* <tr key={loginUser.id}>
        <td>
          <img src={loginUser.icon} />
          {loginUser.family_name}
          {loginUser.first_name}
        </td>
        <td>
          <button>島を抜ける</button>
        </td>
      </tr>
      {newPerson.map((user) => {
        return (
          <tr key={user.id}>
            {anotherUser(user)}
            <td></td>
          </tr>
        );
      })} */}
    </>
  );
}
