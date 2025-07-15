
import GroupRoomIdPage from '@/components/dashboard/group-room/main_id'
import NotificationButtons from '@/components/dashboard/notification'
import Sidenav from '@/components/dashboard/sidenav'
// import ComingSoonPage from '@/components/main/coming'
import Policy from '@/components/pop/policy'

export default async function GroupRoomId({ params }: { params: Promise<{ id: string }> }) {
  // return (
  //   <ComingSoonPage />
  // )

  return (
    <div className="h-screen bg-gray-50">
      <NotificationButtons />
      <Policy />
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
          <Sidenav />
          <main className="flex-1 bg-gray-50">
              <GroupRoomIdPage params={params} />
          </main>
      </div>
    </div>
  )
}
