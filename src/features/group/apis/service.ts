import { z } from "zod";

import { groupRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse, Group } from "@/configs/type";

export const GroupEndpoints = {
    getGroupById: (groupId: string) => `/groups/${groupId}`,
    create: () => "/groups",
    addPendingInvitations: (groupId: string) =>
        `/groups/${groupId}/pending-invitations`,
};

export default class GroupService {
    public static getGroupById(groupId: string): Promise<ApiResponse<Group>> {
        return axiosRequest({
            url: GroupEndpoints.getGroupById(groupId),
            method: AxiosMethod.GET,
        });
    }
    public static create(
        data: z.infer<typeof groupRequestSchema.create>,
    ): Promise<ApiResponse<Group>> {
        return axiosRequest({
            url: GroupEndpoints.create(),
            method: AxiosMethod.POST,
            data: data,
        });
    }
    public static addPendingInvitations(
        groupId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: GroupEndpoints.addPendingInvitations(groupId),
            method: AxiosMethod.POST,
        });
    }
}
