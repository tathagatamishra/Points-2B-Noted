# how to connect 2 different ec2 with one load balancer

---

ok I have created a alb, name is DMA-ALB, the I created security group, name is DMA-SG, and i set the inbound rule to 2610, 443, 80, 22. Then I set listeners and rules to 443 & 80 and created taget group, name DMA-TG, and selected both frontend & backend ec2 and set the port to 2610 . Now in route 53 for dmassociates.in and server.dmassociates.in I created 2 A record and connected both to the same alb, now my if I open dmassociates.in , it is working, but server.dmassociates.in not working

---

# ALB Troubleshooting and Configuration Guide for dmassociates.in

## Current Setup
- ALB Name: DMA-ALB
- Security Group: DMA-SG
- Target Group: DMA-TG
- Domains: dmassociates.in, server.dmassociates.in

## Issues to Address
1. Single target group for both frontend and backend
2. Incorrect port configuration (2610)
3. Missing listener rules for host-based routing
4. Potential security group issues

## Step-by-Step Solution

### 1. Create Separate Target Groups
- Create a new target group for the backend: DMA-Backend-TG
- Rename existing DMA-TG to DMA-Frontend-TG for clarity

For each target group:
- Protocol: HTTP
- Port: Use the actual port your application is running on (e.g., 3000 for Next.js, 5000 for Express)
- Health check path: Set appropriate path (e.g., "/" for frontend, "/api/health" for backend)

### 2. Update Security Groups
a. ALB Security Group (DMA-SG):
   - Inbound rules: Allow 80 and 443 from anywhere (0.0.0.0/0)
   - Remove rules for 2610 and 22 (SSH should be on EC2, not ALB)

b. EC2 Security Groups:
   - Allow traffic from DMA-SG to your application ports (e.g., 3000, 5000)

### 3. Configure Listener Rules
a. HTTP:80 Listener:
   - Action: Redirect to HTTPS

b. HTTPS:443 Listener:
   1. Rule 1 (Highest priority):
      - IF Host header is server.dmassociates.in
      - THEN Forward to DMA-Backend-TG
   2. Rule 2 (Default rule):
      - IF any condition
      - THEN Forward to DMA-Frontend-TG

### 4. Update Target Groups
- Remove EC2 instances from DMA-Frontend-TG
- Add frontend EC2 to DMA-Frontend-TG
- Add backend EC2 to DMA-Backend-TG

### 5. Verify EC2 Configurations
- Ensure your frontend app is running on the correct port (e.g., 3000)
- Ensure your backend app is running on the correct port (e.g., 5000)

### 6. SSL/TLS Certificate
- Verify that a valid SSL certificate for both domains is attached to the HTTPS listener

### 7. Route 53 Configuration
- Verify A records for both domains are pointing to the ALB
- Ensure there are no CNAME records conflicting with the A records

## Troubleshooting Steps
1. Check target group health: Ensure instances are healthy in both target groups
2. Verify security group rules: Confirm ALB can reach EC2 instances
3. Check EC2 instances: Verify applications are running and listening on correct ports
4. Test directly: Try accessing EC2 instances directly to isolate ALB issues
5. Check ALB access logs: Enable and review for any routing issues
6. Verify listener rules: Ensure rules are correctly routing based on host headers

---

I am not able to find where to set the rules

### 3. Configure Listener Rules
a. HTTP:80 Listener:
   - Action: Redirect to HTTPS

b. HTTPS:443 Listener:
   1. Rule 1 (Highest priority):
      - IF Host header is server.dmassociates.in
      - THEN Forward to DMA-Backend-TG
   2. Rule 2 (Default rule):
      - IF any condition
      - THEN Forward to DMA-Frontend-TG

---

# Setting Up ALB Listener Rules

## Accessing the ALB Configuration

1. Go to the AWS Management Console
2. Navigate to EC2 service
3. In the left sidebar, under "Load Balancing", click on "Load Balancers"
4. Find and select your load balancer (DMA-ALB)

## Configuring HTTP:80 Listener

1. In the "Listeners" tab, find the HTTP:80 listener
2. Click the "View/edit rules" button (it might be under the "Actions" dropdown)
3. Delete any existing rules
4. Click "Add rule"
5. For "IF (conditions)", leave it blank (this will apply to all requests)
6. For "THEN (actions)", choose "Redirect to"
7. Set the following:
   - Protocol: HTTPS
   - Port: 443
   - Host, Path, Query: keep original (default)
   - Status code: 301 - Permanently moved
8. Click "Save"

## Configuring HTTPS:443 Listener

1. In the "Listeners" tab, find the HTTPS:443 listener
2. Click the "View/edit rules" button
3. Delete any existing rules
4. Click "Add rule" for the first rule (backend)
5. For "IF (conditions)", choose "Host header"
   - Enter: server.dmassociates.in
6. For "THEN (actions)", choose "Forward to"
   - Select your backend target group (DMA-Backend-TG)
7. Click "Save"
8. Click "Add rule" for the second rule (frontend - default)
9. For "IF (conditions)", leave it blank (this will apply to all requests)
10. For "THEN (actions)", choose "Forward to"
    - Select your frontend target group (DMA-Frontend-TG)
11. Click "Save"

## Verifying Rule Order

1. After adding both rules, ensure the backend rule (server.dmassociates.in) is listed first
2. If needed, use the reorder buttons to adjust the rule priority

## Testing

1. Try accessing both dmassociates.in and server.dmassociates.in
2. Verify that HTTP requests redirect to HTTPS
3. Verify that each domain routes to the correct target group


---

I am running my backend and frontend in 2 seperate folder in aws single ec2 using pm2, frontend on 3000 and backend on 2610 port, I want to connect it with alb

how to do
* Register your EC2 instance to both target groups with the respective ports

---

Certainly, I can guide you through the process of registering your EC2 instance to both target groups with their respective ports. This is a crucial step in setting up your Application Load Balancer (ALB) to work with your frontend and backend services.

Here's a step-by-step guide on how to do this:

1. Open the AWS Management Console and navigate to the EC2 service.

2. In the left sidebar, under "Load Balancing", click on "Target Groups".

3. For each of your target groups (frontend and backend), follow these steps:

   a. Select the target group you want to add the instance to.
   
   b. Click on the "Targets" tab in the lower pane.
   
   c. Click on "Edit" to modify the registered targets.
   
   d. In the "Instances" section, you should see your EC2 instance listed.
   
   e. Select your EC2 instance by checking the box next to it.
   
   f. In the "Port" field for the selected instance, enter the appropriate port:
      - For the frontend target group, enter 3000
      - For the backend target group, enter 2610
   
   g. Click "Add to registered" to move the instance to the registered targets list.
   
   h. Review the changes and click "Save" to confirm.

4. Repeat this process for both your frontend and backend target groups.

After you've completed these steps for both target groups, your EC2 instance will be registered to handle traffic for both your frontend and backend services through the ALB.

Remember:
- For the frontend target group, use port 3000
- For the backend target group, use port 2610

Once you've registered the instances, the ALB will be able to route traffic to the correct service based on the rules you've set up.

Is there anything else you'd like me to clarify about this process?
