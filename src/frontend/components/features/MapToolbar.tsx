import * as Toolbar from "@radix-ui/react-toolbar";
import { ExternalLink, FolderInput, Layers, PencilLine, Ruler } from "lucide-react";
import { type FunctionComponent } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";

export const WebMapToolbar: FunctionComponent = () => {
  return (
    <div className="flex w-full justify-center">
      <Toolbar.Root className="absolute top-5 z-10 flex items-center space-x-5 rounded-full bg-primary-foreground px-4 py-3 shadow-md">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toolbar.Button>
                <Layers className="h-5 w-5" />
              </Toolbar.Button>
            </TooltipTrigger>
            <TooltipContent>Layers</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toolbar.Button>
                <PencilLine className="h-5 w-5" />
              </Toolbar.Button>
            </TooltipTrigger>
            <TooltipContent>Draw</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toolbar.Button>
                <Ruler className="h-5 w-5" />
              </Toolbar.Button>
            </TooltipTrigger>
            <TooltipContent>Measure</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toolbar.Button>
                <FolderInput className="h-5 w-5" />
              </Toolbar.Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toolbar.Button>
                <ExternalLink className="h-5 w-5" />
              </Toolbar.Button>
            </TooltipTrigger>
            <TooltipContent>Share Link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Toolbar.Root>
    </div>
  );
};
