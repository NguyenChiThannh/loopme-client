import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, Group } from "@/configs/type";

export const GroupEndpoints = {
    getGroupById: (groupId: string) => `/groups/${groupId}`,
};

export default class GroupService {
    public static getGroupById(groupId: string): Promise<ApiResponse<Group>> {
        return axiosRequest({
            url: GroupEndpoints.getGroupById(groupId),
            method: AxiosMethod.GET,
        });
    }
}
