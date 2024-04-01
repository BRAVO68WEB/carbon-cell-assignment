import { Context } from "hono";
import { Task5Service } from "../services/task5.service";

const { getAccountBalanceS } = new Task5Service();

export class Task5Controller extends Task5Service {
    public static readonly getAccountBalance = async (ctx: Context) => {
        try {
            const data = await getAccountBalanceS(ctx.req.param('account'));
            return ctx.json({
                account: ctx.req.param('account'),
                balance: data ? data + ' ETH' : 'Account not found',
            });
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 500);
            }
        }
    }
}