import { Router } from "express";

import { UserRouter } from "./users/router.ts";
import { RepoRouter } from "./repo/router.ts";
import { AuthRouter } from "./auth/router.ts";

export const api_router = Router()

api_router.use('/api/user', UserRouter)
api_router.use('/api/repo', RepoRouter)
api_router.use('/api/auth', AuthRouter)