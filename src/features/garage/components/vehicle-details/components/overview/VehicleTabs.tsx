"use client";

import type { ReactNode } from "react";
import { Tabs } from "@base-ui/react/tabs";

export default function VehicleTabs({ overview, serviceHistory }: { overview: ReactNode; serviceHistory: ReactNode }) {
  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List aria-label="Vehicle sections" className="mb-5 flex gap-1 overflow-x-auto border-b border-line">
        <Tabs.Tab value="overview" className="vehicle-section-tab">Overview</Tabs.Tab>
        <Tabs.Tab value="history" className="vehicle-section-tab">Service history</Tabs.Tab>
        <Tabs.Tab value="documents" className="vehicle-section-tab">Documents</Tabs.Tab>
        <Tabs.Tab value="expenses" className="vehicle-section-tab">Expenses</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview" className="space-y-5">{overview}</Tabs.Panel>
      <Tabs.Panel value="history">{serviceHistory}</Tabs.Panel>
      <Tabs.Panel value="documents" className="section-card">
        <h2 className="text-lg font-semibold">Documents</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">Coming soon. Vehicle document uploads and storage are not available yet.</p>
      </Tabs.Panel>
      <Tabs.Panel value="expenses" className="section-card">
        <h2 className="text-lg font-semibold">Expenses</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">Coming soon. For now, record parts and labour costs in your service records.</p>
      </Tabs.Panel>
    </Tabs.Root>
  );
}
