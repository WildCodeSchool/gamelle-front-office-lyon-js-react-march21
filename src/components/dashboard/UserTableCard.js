export default function UserTableCard({ userList }) {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          10 derniers utilisateurs inscrits
        </h2>
      </header>
      {userList && (
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Nom</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">role</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Enregistré le
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-gray-100">
                {userList &&
                  userList.map((user) => {
                    return (
                      <tr key={user.userId}>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="text-gray-800">{`${user.firstname} ${user.lastname}`}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{user.email}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-green-500">
                            {user.role}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">
                            {new Intl.DateTimeFormat('fr-FR', {
                              dateStyle: 'long',
                              timeStyle: 'long',
                            }).format(new Date(user.registeredAt))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
