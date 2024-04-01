import { Context } from "hono";

import { Task1Service } from "../services/task1.service";

export class Task1Controller {
    public static readonly register = async (ctx: Context) => {
        try {
            const result = await Task1Service.register(await ctx.req.json());
            return ctx.json({
                message: "User registered successfully",
                data: result
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.json({
                    message: error.message
                }, 500);
            }
        }
    }

    public static readonly login = async (ctx: Context) => {
        try {
            const result = await Task1Service.login(await ctx.req.json());
            return ctx.json({
                message: "User logged in successfully",
                data: result
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.json({
                    message: error.message
                }, 500);
            }
        }
    }

    public static readonly logout = async (ctx: Context) => {
        try {
            await Task1Service.logout(ctx.get('user_id'));
            return ctx.json({
                message: "User logged out successfully",
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.json({
                    message: error.message
                }, 500);
            }
        }
    }

    public static readonly whoami = async (ctx: Context) => {
        try {
            const result = await Task1Service.whoami(ctx.get('user_id'));
            return ctx.json({
                message: "User details",
                data: result
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.json({
                    message: error.message
                }, 500);
            }
        }
    }
}