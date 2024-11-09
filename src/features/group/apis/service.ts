import { z } from "zod";

import { groupRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import {
    ApiResponse,
    BaseResponse,
    Group,
    Member,
    PaginatedResponse,
} from "@/configs/type";

export const GroupEndpoints = {
    getGroupById: (groupId: string) => `/groups/${groupId}`,
    create: () => "/groups",
    addPendingInvitations: (groupId: string) =>
        `/groups/${groupId}/pending-invitations`,
    waitings: (groupId: string) => `/groups/${groupId}/invitations`,
    members: (groupId: string) => `/groups/${groupId}/members`,
    acceptJoinRequest: (groupId: string, userId: string) =>
        `/groups/${groupId}/accept-invitations/${userId}`,
    removeJoinRequest: (groupId: string, userId: string) =>
        `/groups/${groupId}/pending-invitations/${userId}`,
    removeMember: (groupId: string, userId: string) =>
        `/groups/${groupId}/members/${userId}`,
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
    public static async getAllMembers(
        groupId: string,
    ): Promise<PaginatedResponse<Member[]>> {
        return axiosRequest({
            url: GroupEndpoints.members(groupId),
            method: AxiosMethod.GET,
        });
    }
    public static async getAllWaitings(
        groupId: string,
    ): Promise<PaginatedResponse<Member[]>> {
        return axiosRequest({
            url: GroupEndpoints.waitings(groupId),
            method: AxiosMethod.GET,
        });
    }
    public static async accpetJoinRequest(
        groupId: string,
        userId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: GroupEndpoints.acceptJoinRequest(groupId, userId),
            method: AxiosMethod.POST,
        });
    }
    public static async declineJoinRequest(
        groupId: string,
        userId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: GroupEndpoints.removeJoinRequest(groupId, userId),
            method: AxiosMethod.DELETE,
        });
    }
    public static async removeMember(
        groupId: string,
        userId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: GroupEndpoints.removeMember(groupId, userId),
            method: AxiosMethod.DELETE,
        });
    }
}
