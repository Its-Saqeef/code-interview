import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Toggle } from './ui/Toggle';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { Checkbox } from './ui/Checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/Tooltip';
import { Popover, PopoverTrigger, PopoverContent } from './ui/Popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/Select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/Dropdown';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/Modal';
import { Settings, Info, Bell, Check, User, LogOut, Shield } from 'lucide-react';

export const SystemDesign = () => {
  const [toggleState, setToggleState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(true);
  const [language, setLanguage] = useState('typescript');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] p-8 font-inter">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-[30px] font-semibold leading-[38px] tracking-[-0.02em] text-white">Technical Precision</h1>
            <p className="text-[#908fa0] text-lg max-w-2xl">
              A developer-centric, professional component library built with Radix UI, designed for deep focus and absolute utility.
            </p>
          </div>

          {/* Colors Section */}
          <section className="space-y-6">
            <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] border-b border-[#2D3149] pb-2 text-white">Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <ColorSwatch color="bg-[#0F1117]" name="Level 0 Base" hex="#0F1117" />
              <ColorSwatch color="bg-[#1A1D27]" name="Level 1 Surface" hex="#1A1D27" />
              <ColorSwatch color="bg-[#22263A]" name="Level 2 Elevated" hex="#22263A" />
              <ColorSwatch color="bg-[#6366F1]" name="Indigo Accent" hex="#6366F1" />
              <ColorSwatch color="bg-[#2D3149]" name="Border Color" hex="#2D3149" />
              <ColorSwatch color="bg-[#10B981]" name="Success Status" hex="#10B981" />
              <ColorSwatch color="bg-[#EF4444]" name="Error Status" hex="#EF4444" />
            </div>
          </section>

          {/* Core Interactive & Typography Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Typography */}
            <section className="space-y-6">
              <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] border-b border-[#2D3149] pb-2 text-white">Typography</h2>
              <Card>
                <div className="space-y-6">
                  <div>
                    <Label className="text-[#908fa0] mb-1 block">Headline Large</Label>
                    <h1 className="text-[30px] font-semibold leading-[38px] tracking-[-0.02em] text-white">30px Semibold (-0.02em)</h1>
                  </div>
                  <div>
                    <Label className="text-[#908fa0] mb-1 block">Headline Medium</Label>
                    <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-white">24px Semibold (-0.01em)</h2>
                  </div>
                  <div>
                    <Label className="text-[#908fa0] mb-1 block">Body Large</Label>
                    <p className="text-[16px] leading-[24px]">16px regular body text for descriptions and paragraph copy.</p>
                  </div>
                  <div>
                    <Label className="text-[#908fa0] mb-1 block">Code Medium / JetBrains Mono</Label>
                    <pre className="p-3 bg-[#0F1117] border border-[#2D3149] rounded-[6px] font-mono text-sm leading-[22px] text-[#c0c1ff]">
                      <code>{`const config = {\n  theme: "developer-utilitarian",\n  spacing: "modular-4px"\n};`}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            </section>

            {/* Inputs & Form Controls */}
            <section className="space-y-6">
              <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] border-b border-[#2D3149] pb-2 text-white">Form Controls</h2>
              <Card>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="input-demo">Input Field</Label>
                    <Input id="input-demo" placeholder="Type here..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textarea-demo">Textarea</Label>
                    <Textarea id="textarea-demo" placeholder="Write logs, notes, or descriptions..." rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language Selection</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="rust">Rust</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col justify-end pb-2.5">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="check-demo" 
                          checked={checkboxState} 
                          onCheckedChange={(checked) => setCheckboxState(checked === true)} 
                        />
                        <Label htmlFor="check-demo" className="normal-case cursor-pointer text-[#e4e1ed] font-sans font-medium tracking-normal text-sm">
                          Checkbox Option
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2D3149]">
                    <div className="flex flex-col">
                      <Label className="text-white">Active Session Toggle</Label>
                      <span className="text-xs text-[#908fa0] mt-0.5">Flip switch to change active state</span>
                    </div>
                    <Toggle isOn={toggleState} onToggle={() => setToggleState(!toggleState)} />
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Tabs and Cards Section */}
          <section className="space-y-6">
            <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] border-b border-[#2D3149] pb-2 text-white">Containers & Layout</h2>
            <Card className="p-0 overflow-hidden">
              <Tabs defaultValue="tab-badge">
                <div className="px-6 pt-4 bg-[#1F1F27] border-b border-[#2D3149]">
                  <TabsList>
                    <TabsTrigger value="tab-badge">Badges & Tags</TabsTrigger>
                    <TabsTrigger value="tab-buttons">Buttons & Radii</TabsTrigger>
                    <TabsTrigger value="tab-cards">Card Structure</TabsTrigger>
                  </TabsList>
                </div>
                <div className="p-6">
                  <TabsContent value="tab-badge">
                    <div className="space-y-4">
                      <p className="text-sm text-[#908fa0]">Status badges feature a 10% opacity background of their semantic color with a solid colored dot and high-contrast text.</p>
                      <div className="flex flex-wrap gap-4">
                        <Badge variant="success" label="Success" />
                        <Badge variant="error" label="Error" />
                        <Badge variant="inprogress" label="In Progress" />
                        <Badge variant="neutral" label="Neutral Tag" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tab-buttons">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary (6px)</Button>
                        <Button variant="secondary">Secondary (6px)</Button>
                        <Button variant="primary" size="sm">Small</Button>
                        <Button variant="primary" size="lg">Large Action</Button>
                      </div>
                      <p className="text-xs text-[#908fa0] font-mono">Note: Primary buttons feature Indigo (#6366F1) fill and subtle shadow glow on hover.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="tab-cards">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-[#1A1D27] border border-[#2D3149]">
                        <CardHeader>
                          <CardTitle>Level 1 Card</CardTitle>
                          <CardDescription>Normal section container</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-[#908fa0]">Utilizes background `#1A1D27`, 8px rounded corners, and standard border `#2D3149`.</p>
                        </CardContent>
                        <CardFooter>
                          <span className="text-xs text-[#908fa0]">Footer details go here</span>
                        </CardFooter>
                      </Card>

                      <Card className="bg-[#22263A] border border-[#2D3149] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                        <CardHeader>
                          <CardTitle>Level 2 Card</CardTitle>
                          <CardDescription>Elevated interactive component</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-[#908fa0]">Utilizes background `#22263A` and a subtle 25% shadow, typically reserved for overlays and popovers.</p>
                        </CardContent>
                        <CardFooter>
                          <span className="text-xs text-[#908fa0]">Footer details go here</span>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </section>

          {/* Overlays, Modals, and Menus */}
          <section className="space-y-6">
            <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.01em] border-b border-[#2D3149] pb-2 text-white">Overlays & Floating UI</h2>
            <Card>
              <div className="flex flex-wrap gap-6 items-center">
                {/* Tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Info className="h-4 w-4 text-[#908fa0]" /> Hover for Tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Developer statistics are updated in real-time</span>
                  </TooltipContent>
                </Tooltip>

                {/* Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Bell className="h-4 w-4 text-[#908fa0]" /> Open Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white text-sm">Notifications</h4>
                      <p className="text-xs text-[#908fa0]">You have 3 review requests pending on your branches today.</p>
                      <div className="flex justify-end pt-1">
                        <Button variant="primary" size="sm">Mark as read</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Settings className="h-4 w-4 text-[#908fa0]" /> User Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="px-2 py-1.5 text-xs font-semibold text-[#908fa0]">Account Profile</div>
                    <DropdownMenuItem className="gap-2">
                      <User className="h-4 w-4 opacity-70" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Shield className="h-4 w-4 opacity-70" />
                      <span>Security Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-[#EF4444] focus:bg-[#EF4444]/10 focus:text-[#EF4444]">
                      <LogOut className="h-4 w-4 opacity-70" />
                      <span>Logout Session</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Dialog / Modal */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="primary">Open Dialog Window</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Elevated Dialog Window</DialogTitle>
                      <DialogDescription>
                        This popup layer utilizes Level 2 elevated surfaces and Radix focus management for WAI-ARIA compatibility.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3 p-3 bg-[#0F1117] border border-[#2D3149] rounded-[6px]">
                        <Check className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                        <p className="text-sm text-[#908fa0]">Your recent session configuration has been verified successfully.</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button variant="primary" onClick={() => setDialogOpen(false)}>Confirm</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </section>

        </div>
      </div>
    </TooltipProvider>
  );
};

function ColorSwatch({ color, name, hex }: { color: string, name: string, hex: string }) {
  return (
    <Card className="p-3 bg-[#1A1D27] border border-[#2D3149] space-y-3">
      <div className={`h-16 w-full rounded-[6px] border border-[#2D3149] ${color}`}></div>
      <div>
        <div className="text-xs font-semibold text-white truncate">{name}</div>
        <div className="text-[10px] text-[#908fa0] font-mono mt-0.5">{hex}</div>
      </div>
    </Card>
  );
}

export default SystemDesign;
