---
title: 'Loki'
description: |
  Loki is an open-source log aggregation tool. In this tutorial, you can see how you can query it in case you need to investigate logs.
---

**Loki is an open-source log aggregation tool. In this tutorial, you can see how you can query it in case you need to investigate logs.**

**Step 1:** Navigate to your environment's config screen by clicking the Environments button on top, and selecting the environment by clicking on its card.

**Step 2:** In the menu on the left-side, navigate to Logging. Loki settings should appear on top.

**Step 3:** Turn on the Enabled toggle.

## Loki Settings

**Storage:** You can select the type of the storage that you use to store logs. Volume is the default setting.

**Retention (in days):** You can specify how many days you'd like to store Loki logs for.

**Persistence:** Turn persistent metrics storage on and off with this toggle.

**Peristent Volume Size (in GB):** Persistent storage will be able to store the amount of data specified by you.

### S3 Bucket Settings

**S3 URL:** The address where your S3 is available. Follow this format: `s3://<access_key>:<uri-encoded-secret-access-key>@<region>`.

**Bucket Name:** The name of the bucket that'll be used in the yaml that contains Loki configuration.
