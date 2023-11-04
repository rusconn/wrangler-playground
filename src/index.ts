export interface Env {
  CONFIG1: string;
  SECRET1: string;
  MY_KV: KVNamespace;
  MY_D1: D1Database;
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  // MY_BUCKET: R2Bucket;
  // MY_SERVICE: Fetcher;
  // MY_QUEUE: Queue;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const [v, xs] = await Promise.all([
      env.MY_KV.get('name'),
      env.MY_D1.prepare('select * from "user";').all(),
    ]);

    console.log(v);
    console.log(JSON.stringify(xs.results));
    console.log(env.CONFIG1);
    console.log(env.SECRET1.length);

    return new Response(request.headers.get('user-agent') ?? 'unknown user-agent');
  },
};
