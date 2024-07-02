import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";
import { Table, TableBody } from "@/components/common/atom/table";
import FriendsListItem from "@/components/main/module/FriendsListItem";

const FriendsListContainer = ({
  data = playlistListDefault,
  userId,
}: {
  data?: PlaylistType[];
  userId?: string;
}) => {
  return (
    <div className={`flex items-start justify-start gap-3`}>
      <Table>
        <TableBody>
          {data?.map((item, index) => {
            return (
              <FriendsListItem
                playlist={item}
                userId={userId}
                key={`friends_list_${item.id}`}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FriendsListContainer;
