# アクセス解析

AWSを使用したセルフホストのアクセス解析システム

取得できるログの例

```{json}
{"time": "30/Apr/2023:11:01:35 +0000","ip": "xxx.xxx.xxx.xxx","data": "{"type":"page","properties":{"title":"","url":"https://example.com/index.html","path":"/index.html","hash":"","search":"","width":647,"height":1039},"options":{},"userId":"user-id-xyz","anonymousId":"e8a602e8-9688-4c04-8e1f-06b7e1e95658","meta":{"rid":"9eb11317-53f6-46f2-8a73-6e3b0259b8d0","ts":1682852495299,"hasCallback":true}}"}
{"time": "30/Apr/2023:11:01:46 +0000","ip": "xxx.xxx.xxx.xxx","data": "{"type":"page","properties":{"title":"","url":"https://example.com/index.html","path":"/index.html","hash":"","search":"","width":647,"height":1039},"options":{},"userId":"user-id-xyz","anonymousId":"e8a602e8-9688-4c04-8e1f-06b7e1e95658","meta":{"rid":"38884f2e-9108-4440-9d8f-0c6a2c08da72","ts":1682852506092,"hasCallback":true}}"}
{"time": "30/Apr/2023:11:01:47 +0000","ip": "xxx.xxx.xxx.xxx","data": "{"type":"page","properties":{"title":"","url":"https://example.com/index.html","path":"/index.html","hash":"","search":"","width":647,"height":1039},"options":{},"userId":"user-id-xyz","anonymousId":"e8a602e8-9688-4c04-8e1f-06b7e1e95658","meta":{"rid":"438bf7d1-32f9-4481-ba62-14ad5f0b18ee","ts":1682852507411,"hasCallback":true}}"}
```

## 使い方

### パラメータの指定

cdk.json

| パラメータ名             | 説明                                             |
| ------------------------ | ------------------------------------------------ |
| `access-log-bucket-name` | バケット名(例: "access-log-bucket-123456789012") |
| `access-log-stream-name` | ストリーム名(例: "access-log-stream")            |
| `cross-origin`           | クロスオリジン設定 (例: ["*"])                   |
| `interval-in-seconds`    | バッファサイズの間隔(例: 60)                     |
| `buffer-size-in-mb`      | バッファサイズ(例: 1)                            |

### Stack 生成例

```{typescript}
const app = new cdk.App();

const bucketName = app.node.tryGetContext("access-log-bucekt-name") as string;
const streamName = app.node.tryGetContext("access-log-stream-name") as string;
const crossOrigin = app.node.tryGetContext("cross-origin") as [string];

new AccessLogStack(app, "AccessLogStack", {
  bucketName: bucketName,
  streamName: streamName,
  crossOrigin: crossOrigin,
});
```

### フロント側

[クライアント側の実装例](./sample-client/README.md)

## ビルド方法

```{bash}
npx cdk deploy --all
```

## テスト

```{bash}
npm test
```

## 設計

![システム図](./image/architecture.drawio.png)

Kinesis Firehose を API Gateway から直接呼び出す形とする。

## クォータ

以下、東京リージョン(ap-northeast-1)でのクォータの例。
特にクォータを引き上げずとも、1000 リクスト/秒までは可能。

### API Gateway

- 10K リクエスト/秒

[出典](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/limits.html)

### Kinesis Firehose

- レコードサイズ: 100KiB
- Direct PUT: 100k レコード/秒, 1k リエスト/秒, 1 Mib/秒

[出典](https://docs.aws.amazon.com/firehose/latest/dev/limits.html)

### セキュリティ

OWASP ZAP を使用して、セキュリティセキュリティスキャンを行った。
以下結果(ただし、クロスオリジン設定を`["https://example.com"]`としている)

```{bash}
cd security
docker compose run api-scan
```

| Name                                                    | Risk Level    | Number of Instances |
| ------------------------------------------------------- | ------------- | ------------------- |
| A Client Error response code was returned by the server | Informational | 59                  |
| Non-Storable Content                                    | Informational | 1                   |
| Re-examine Cache-control Directives                     | Informational | 1                   |
| Storable and Cacheable Content                          | Informational | 1                   |

[レポート](./security/api-scan-report.md)

### オペレーション

| サービス項目 | 設計内容                           | 設定                                |
| ------------ | ---------------------------------- | ----------------------------------- |
| サービス時間 | サービス時間                       | 24/365                              |
|              | 計画停止予定通知                   | 未設定                              |
| 可用性       | サービス稼働率                     | 99.7%                              |
|              | ディザスタリカバリ                 | なし                                |
|              | 重大障害時の代替手段               | なし                                |
|              | アップグレード方針                 | 未設定                              |
| 信頼性       | 平均復旧時間                       | 未設定                              |
|              | システム監視基準                   | 監視しない                          |
|              | 障害通知プロセス                   | 未設定                              |
|              | 障害通知時間                       | 未設定                              |
|              | 障害監視間隔                       | 未設定                              |
|              | サービス提供状況の報告方法／間隔   | 未設定                              |
|              | ログの取得                         | 未設定                              |
|              | データ保証の要件                   | 未設定                              |
|              | バックアップデータの保存期間       | 未設定                              |
|              | データ消去の要件                   | 未設定                              |
| サポート     | サービス提供時間帯（障害対応）     | しない                              |
|              | サービス提供時間帯（一般問合せ）   | しない                              |
| 性能基準     | オンライン応答時間）               | 未設定                              |
|              | バッチ処理時間                     | -                                   |
|              | カスタマイズ性                     | -                                   |
|              | 外部接続性                         | なし                                |
|              | 同時接続ユーザ数                   | ユーザ数ではなく 1000 リクエスト/秒 |
| セキュリティ | 公的認証取得の要件                 | 未取得                              |
|              | アプリケーションに関する第三者評価 | OWASP ZAP                           |
|              | 情報取扱者の制限                   | 未設定                              |
|              | 通信の暗号化レベル                 | SSL                                 |

[出典](https://home.jeita.or.jp/is/committee/solution/guideline/080131/index.html)

## 可用性

以下より、システムの可用性は、99.7%程度とする。

### API Gateway

99.95%

[出典](https://aws.amazon.com/api-gateway/sla/?did=sla_card&trk=sla_card)

### Kinesis Firehose

99.9%

[出典](https://aws.amazon.com/jp/kinesis/sla/?did=sla_card&trk=sla_card)

### S3

99.9%

[出典](https://aws.amazon.com/jp/s3/sla/?did=sla_card&trk=sla_card)


## FAQ

### Q. なぜ、Kinesis Firehose を使用するのか？

以下の理由より、CloudWatch Logs ではなく、Kinesis Firehose を使用する。

- CloudWatch Logsは、PutLogEvents API に対して、1秒あたり 5 リクエストまでの制限がある。
- CloudWatch Logsは、ストレージ価格が高い。

[CloudWatch Logs のクォータ](https://dev.classmethod.jp/articles/cloudwatch-logs-log-stream-remove-transaction-quota/)